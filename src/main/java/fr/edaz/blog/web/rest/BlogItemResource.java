package fr.edaz.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.edaz.blog.domain.User;
import fr.edaz.blog.security.AuthoritiesConstants;
import fr.edaz.blog.security.SecurityUtils;
import fr.edaz.blog.service.BlogItemService;
import fr.edaz.blog.service.BlogService;
import fr.edaz.blog.service.UserService;
import fr.edaz.blog.service.dto.BlogDTO;
import fr.edaz.blog.web.rest.errors.BadRequestAlertException;
import fr.edaz.blog.web.rest.util.HeaderUtil;
import fr.edaz.blog.web.rest.util.PaginationUtil;
import fr.edaz.blog.service.dto.BlogItemDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BlogItem.
 */
@RestController
@RequestMapping("/api")
public class BlogItemResource {

    private final Logger log = LoggerFactory.getLogger(BlogItemResource.class);

    private static final String ENTITY_NAME = "blogItem";

    private final BlogItemService blogItemService;

    private final BlogService blogService;

    private final UserService userService;

    public BlogItemResource(BlogItemService blogItemService, BlogService blogService, UserService userService) {
        this.blogItemService = blogItemService;
        this.blogService = blogService;
        this.userService = userService;
    }

    /**
     * POST  /blog-items : Create a new blogItem.
     *
     * @param blogItemDTO the blogItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blogItemDTO, or with status 400 (Bad Request) if the blogItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blog-items")
    @Timed
    public ResponseEntity<BlogItemDTO> createBlogItem(@Valid @RequestBody BlogItemDTO blogItemDTO, Principal principal) throws URISyntaxException {
        log.debug("REST request to save BlogItem : {}", blogItemDTO);
        if (blogItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new blogItem cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)) {
            Optional<String> login = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userService.getUserWithAuthoritiesByLogin(login.get());
            blogItemDTO.setAuthorId(user.get().getId());
            blogItemDTO.setCreated(ZonedDateTime.now());
            BlogDTO blogDTO = blogService.findByUsername(user.get().getLogin());
            blogItemDTO.setBlogId(blogDTO.getId());
        }

        BlogItemDTO result = blogItemService.save(blogItemDTO);
        return ResponseEntity.created(new URI("/api/blog-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blog-items : Updates an existing blogItem.
     *
     * @param blogItemDTO the blogItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blogItemDTO,
     * or with status 400 (Bad Request) if the blogItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the blogItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blog-items")
    @Timed
    public ResponseEntity<BlogItemDTO> updateBlogItem(@Valid @RequestBody BlogItemDTO blogItemDTO, Principal principal) throws URISyntaxException {
        log.debug("REST request to update BlogItem : {}", blogItemDTO);
        if (blogItemDTO.getId() == null) {
            return createBlogItem(blogItemDTO, principal);
        }

        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)) {
            Optional<String> login = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userService.getUserWithAuthoritiesByLogin(login.get());
            if (!blogItemDTO.getAuthorId().equals(user.get().getId())) {
                throw new BadRequestAlertException("You cannot modify blog item of other user", ENTITY_NAME, "internalServerError");
            }
        }

        BlogItemDTO result = blogItemService.save(blogItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blogItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blog-items : get all the blogItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogItems in body
     */
    @GetMapping("/blog-items")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> getAllBlogItems(Pageable pageable) {
        log.debug("REST request to get a page of BlogItems");

        Page<BlogItemDTO> page;

        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            page = blogItemService.findAll(pageable);
        } else {
            page = blogItemService.findAllByCurrentUser(pageable);
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blog-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/blogs/{blogName}/blog-items")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> getAllBlogItemsByBlogName(@PathVariable String blogName, Pageable pageable) {
        log.debug("REST request to get a page of BlogItems");

        Page<BlogItemDTO> page = blogItemService.findAllByBlogName(blogName, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blog-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/blogs/{blogName}/blog-items/tag/{tagName}")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> getAllBlogItemsByBlogName(@PathVariable String blogName, @PathVariable String tagName, Pageable pageable) {
        log.debug("REST request to get a page of BlogItems");

        Page<BlogItemDTO> page = blogItemService.findAllByBlogNameAndtagName(blogName, tagName,pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blog-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blog-items/:id : get the "id" blogItem.
     *
     * @param id the id of the blogItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blogItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/blog-items/{id}")
    @Timed
    public ResponseEntity<BlogItemDTO> getBlogItem(@PathVariable Long id) {
        log.debug("REST request to get BlogItem : {}", id);
        BlogItemDTO blogItemDTO = blogItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blogItemDTO));
    }

    /**
     * DELETE  /blog-items/:id : delete the "id" blogItem.
     *
     * @param id the id of the blogItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blog-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlogItem(@PathVariable Long id) {
        log.debug("REST request to delete BlogItem : {}", id);

        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)) {
            Optional<String> login = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userService.getUserWithAuthoritiesByLogin(login.get());
            BlogItemDTO itemToDelete = blogItemService.findOne(id);
            if (!itemToDelete.getAuthorId().equals(user.get().getId())) {
                throw new BadRequestAlertException("You cannot delete blog item of other user", ENTITY_NAME, "internalServerError");
            }
        }

        blogItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/blog-items?query=:query : search for the blogItem corresponding
     * to the query.
     *
     * @param query    the query of the blogItem search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/blog-items")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> searchBlogItems(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of BlogItems for query {}", query);
        Page<BlogItemDTO> page;
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            page = blogItemService.search(query, pageable);
        } else {
            page = blogItemService.searchByCurrentUser(query, pageable);
        }
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/blog-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/_search/blog-items/{blogName}")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> searchBlogItemsByBlogName(@PathVariable String blogName, @RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of BlogItems for query {}", query);
        Page<BlogItemDTO> page = blogItemService.searchByBlogName(blogName, query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/blog-items/" + blogName);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/_search/blog-items/{blogName}/tag/{tagName}")
    @Timed
    public ResponseEntity<List<BlogItemDTO>> searchBlogItemsByBlogNameAndTagName(@PathVariable String blogName, @PathVariable String tagName,@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of BlogItems for query {}", query);
        Page<BlogItemDTO> page = blogItemService.searchByBlogNameAndTagName(blogName,tagName, query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/blog-items/" + blogName+ "/tag/" + tagName);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
