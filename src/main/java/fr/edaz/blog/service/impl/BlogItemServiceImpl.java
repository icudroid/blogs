package fr.edaz.blog.service.impl;

import fr.edaz.blog.domain.Blog;
import fr.edaz.blog.domain.Tag;
import fr.edaz.blog.domain.User;
import fr.edaz.blog.repository.BlogRepository;
import fr.edaz.blog.repository.TagRepository;
import fr.edaz.blog.repository.UserRepository;
import fr.edaz.blog.security.SecurityUtils;
import fr.edaz.blog.service.BlogItemService;
import fr.edaz.blog.domain.BlogItem;
import fr.edaz.blog.repository.BlogItemRepository;
import fr.edaz.blog.repository.search.BlogItemSearchRepository;
import fr.edaz.blog.service.dto.BlogItemDTO;
import fr.edaz.blog.service.mapper.BlogItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing BlogItem.
 */
@Service
@Transactional
public class BlogItemServiceImpl implements BlogItemService {

    private final Logger log = LoggerFactory.getLogger(BlogItemServiceImpl.class);

    private final BlogItemRepository blogItemRepository;

    private final BlogRepository blogRepository;

    private final TagRepository tagRepository;

    private final BlogItemMapper blogItemMapper;

    private final BlogItemSearchRepository blogItemSearchRepository;

    private final UserRepository userRepository;

    public BlogItemServiceImpl(BlogItemRepository blogItemRepository, BlogRepository blogRepository, TagRepository tagRepository, BlogItemMapper blogItemMapper, BlogItemSearchRepository blogItemSearchRepository, UserRepository userRepository) {
        this.blogItemRepository = blogItemRepository;
        this.blogRepository = blogRepository;
        this.tagRepository = tagRepository;
        this.blogItemMapper = blogItemMapper;
        this.blogItemSearchRepository = blogItemSearchRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a blogItem.
     *
     * @param blogItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BlogItemDTO save(BlogItemDTO blogItemDTO) {
        log.debug("Request to save BlogItem : {}", blogItemDTO);
        BlogItem blogItem = blogItemMapper.toEntity(blogItemDTO);
        blogItem = blogItemRepository.save(blogItem);
        BlogItemDTO result = blogItemMapper.toDto(blogItem);
        blogItemSearchRepository.save(blogItem);
        return result;
    }

    /**
     * Get all the blogItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BlogItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BlogItems");
        return blogItemRepository.findAll(pageable)
            .map(blogItemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BlogItemDTO> findAllByCurrentUser(Pageable pageable) {
        log.debug("Request to get all BlogItems");
        return blogItemRepository.findByAuthorIsCurrentUser(pageable)
            .map(blogItemMapper::toDto);
    }

    /**
     * Get one blogItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BlogItemDTO findOne(Long id) {
        log.debug("Request to get BlogItem : {}", id);
        BlogItem blogItem = blogItemRepository.findOneWithEagerRelationships(id);
        return blogItemMapper.toDto(blogItem);
    }

    /**
     * Delete the blogItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BlogItem : {}", id);
        blogItemRepository.delete(id);
        blogItemSearchRepository.delete(id);
    }

    /**
     * Search for the blogItem corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BlogItemDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of BlogItems for query {}", query);
        Page<BlogItem> result = blogItemSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(blogItemMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Page<BlogItemDTO> searchByCurrentUser(String query, Pageable pageable) {
        log.debug("Request to search for a page of BlogItems for query {}", query);

        Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(login.get());

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(queryStringQuery(query))
            .withFilter(boolQuery().must(termQuery("author.id", user.get().getId())))
            .withPageable(pageable)
            .build();

        Page<BlogItem> result = blogItemSearchRepository.search(searchQuery);
        return result.map(blogItemMapper::toDto);
    }

    @Override
    public Page<BlogItemDTO> searchByBlogName(String blogName, String query, Pageable pageable) {
        log.debug("Request to search for a page of BlogItems for query {}", query);

        Blog blog = blogRepository.findByTitle(blogName);

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(queryStringQuery(query))
            .withFilter(boolQuery().must(termQuery("blog.id", blog.getId())))
            .withPageable(pageable)
            .build();

        Page<BlogItem> result = blogItemSearchRepository.search(searchQuery);
        return result.map(blogItemMapper::toDto);
    }

    @Override
    public Page<BlogItemDTO> searchByBlogNameAndTagName(String blogName, String tagName, String query, Pageable pageable) {
        log.debug("Request to search for a page of BlogItems for query {}", query);

        Blog blog = blogRepository.findByTitle(blogName);
        Tag tag = tagRepository.findByTagName(tagName);

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(queryStringQuery(query))
            .withFilter(boolQuery().must(termQuery("blog.id", blog.getId())))
            .withFilter(boolQuery().must(termQuery("blog.tags.id", tag.getId())))
            .withPageable(pageable)
            .build();

        Page<BlogItem> result = blogItemSearchRepository.search(searchQuery);
        return result.map(blogItemMapper::toDto);
    }

    @Override
    public Page<BlogItemDTO> findAllByBlogName(String blogName, Pageable pageable) {
        log.debug("Request to get all BlogItems");
        return blogItemRepository.findAllByBlogTitle(blogName, pageable)
            .map(blogItemMapper::toDto);
    }

    @Override
    public Page<BlogItemDTO> findAllByBlogNameAndtagName(String blogName, String tagName, Pageable pageable) {
        log.debug("Request to get all BlogItems");
        return blogItemRepository.findAllByBlogTitleAndTagName(blogName, tagName, pageable)
            .map(blogItemMapper::toDto);
    }




}
