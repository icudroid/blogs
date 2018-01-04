package fr.edaz.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.edaz.blog.domain.User;
import fr.edaz.blog.security.AuthoritiesConstants;
import fr.edaz.blog.security.SecurityUtils;
import fr.edaz.blog.service.BlogService;
import fr.edaz.blog.service.UserService;
import fr.edaz.blog.web.rest.errors.BadRequestAlertException;
import fr.edaz.blog.web.rest.util.HeaderUtil;
import fr.edaz.blog.service.dto.BlogDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blog.
 */
@RestController
@RequestMapping("/api")
public class BlogResource {

    private final Logger log = LoggerFactory.getLogger(BlogResource.class);

    private static final String ENTITY_NAME = "blog";

    private final BlogService blogService;

    private final UserService userService;

    public BlogResource(BlogService blogService, UserService userService) {
        this.blogService = blogService;
        this.userService = userService;
    }

    /**
     * POST  /blogs : Create a new blog.
     *
     * @param blogDTO the blogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blogDTO, or with status 400 (Bad Request) if the blog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blogs")
    @Timed
    public ResponseEntity<BlogDTO> createBlog(@Valid @RequestBody BlogDTO blogDTO, Principal principal) throws URISyntaxException {
        log.debug("REST request to save Blog : {}", blogDTO);
        if (blogDTO.getId() != null) {
            throw new BadRequestAlertException("A new blog cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)){
            Optional<String> login = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userService.getUserWithAuthoritiesByLogin(login.get());
            blogDTO.setAuthorId(user.get().getId());
        }

        BlogDTO result = blogService.save(blogDTO);
        return ResponseEntity.created(new URI("/api/blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blogs : Updates an existing blog.
     *
     * @param blogDTO the blogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blogDTO,
     * or with status 400 (Bad Request) if the blogDTO is not valid,
     * or with status 500 (Internal Server Error) if the blogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blogs")
    @Timed
    public ResponseEntity<BlogDTO> updateBlog(@Valid @RequestBody BlogDTO blogDTO, Principal principal) throws URISyntaxException {
        log.debug("REST request to update Blog : {}", blogDTO);
        if (blogDTO.getId() == null) {
            return createBlog(blogDTO, principal);
        }

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)){
            Optional<String> login = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userService.getUserWithAuthoritiesByLogin(login.get());
            if(blogDTO.getAuthorId().equals(user.get().getId())){
                throw new BadRequestAlertException("You cannot modify blog of other user", ENTITY_NAME, "internalServerError");
            }
        }

        BlogDTO result = blogService.save(blogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs")
    @Timed
    public List<BlogDTO> getAllBlogs() {
        log.debug("REST request to get all Blogs");
        return blogService.findAll();
        }

    /**
     * GET  /blogs/:id : get the "id" blog.
     *
     * @param id the id of the blogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/blogs/{id}")
    @Timed
    public ResponseEntity<BlogDTO> getBlog(@PathVariable Long id) {
        log.debug("REST request to get Blog : {}", id);
        BlogDTO blogDTO = blogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blogDTO));
    }

    /**
     * DELETE  /blogs/:id : delete the "id" blog.
     *
     * @param id the id of the blogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        log.debug("REST request to delete Blog : {}", id);
        blogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/blogs?query=:query : search for the blog corresponding
     * to the query.
     *
     * @param query the query of the blog search
     * @return the result of the search
     */
    @GetMapping("/_search/blogs")
    @Timed
    public List<BlogDTO> searchBlogs(@RequestParam String query) {
        log.debug("REST request to search Blogs for query {}", query);
        return blogService.search(query);
    }


    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/blog")
    @Timed
    public BlogDTO getBlog(Principal principal) {
        log.debug("REST request to search Blog for user {}", principal.getName());
        return blogService.findByUsername(principal.getName());
    }



}
