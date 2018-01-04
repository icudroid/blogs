package fr.edaz.blog.service.impl;

import fr.edaz.blog.service.CommentBlogItemService;
import fr.edaz.blog.domain.CommentBlogItem;
import fr.edaz.blog.repository.CommentBlogItemRepository;
import fr.edaz.blog.repository.search.CommentBlogItemSearchRepository;
import fr.edaz.blog.service.dto.CommentBlogItemDTO;
import fr.edaz.blog.service.dto.CommentBlogItemWithAuthorDTO;
import fr.edaz.blog.service.mapper.CommentBlogItemMapper;
import fr.edaz.blog.service.mapper.CommentBlogItemWithAuthorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CommentBlogItem.
 */
@Service
@Transactional
public class CommentBlogItemServiceImpl implements CommentBlogItemService{

    private final Logger log = LoggerFactory.getLogger(CommentBlogItemServiceImpl.class);

    private final CommentBlogItemRepository commentBlogItemRepository;

    private final CommentBlogItemMapper commentBlogItemMapper;

    private final CommentBlogItemWithAuthorMapper commentBlogItemWithAuthorMapper;

    private final CommentBlogItemSearchRepository commentBlogItemSearchRepository;

    public CommentBlogItemServiceImpl(CommentBlogItemRepository commentBlogItemRepository, CommentBlogItemMapper commentBlogItemMapper, CommentBlogItemWithAuthorMapper commentBlogItemWithAuthorMapper, CommentBlogItemSearchRepository commentBlogItemSearchRepository) {
        this.commentBlogItemRepository = commentBlogItemRepository;
        this.commentBlogItemMapper = commentBlogItemMapper;
        this.commentBlogItemWithAuthorMapper = commentBlogItemWithAuthorMapper;
        this.commentBlogItemSearchRepository = commentBlogItemSearchRepository;
    }

    /**
     * Save a commentBlogItem.
     *
     * @param commentBlogItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CommentBlogItemDTO save(CommentBlogItemDTO commentBlogItemDTO) {
        log.debug("Request to save CommentBlogItem : {}", commentBlogItemDTO);
        CommentBlogItem commentBlogItem = commentBlogItemMapper.toEntity(commentBlogItemDTO);
        commentBlogItem = commentBlogItemRepository.save(commentBlogItem);
        CommentBlogItemDTO result = commentBlogItemMapper.toDto(commentBlogItem);
        commentBlogItemSearchRepository.save(commentBlogItem);
        return result;
    }

    /**
     * Get all the commentBlogItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CommentBlogItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CommentBlogItems");
        return commentBlogItemRepository.findAll(pageable)
            .map(commentBlogItemMapper::toDto);
    }

    /**
     * Get one commentBlogItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CommentBlogItemDTO findOne(Long id) {
        log.debug("Request to get CommentBlogItem : {}", id);
        CommentBlogItem commentBlogItem = commentBlogItemRepository.findOne(id);
        return commentBlogItemMapper.toDto(commentBlogItem);
    }

    /**
     * Delete the commentBlogItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommentBlogItem : {}", id);
        commentBlogItemRepository.delete(id);
        commentBlogItemSearchRepository.delete(id);
    }

    /**
     * Search for the commentBlogItem corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CommentBlogItemDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CommentBlogItems for query {}", query);
        Page<CommentBlogItem> result = commentBlogItemSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(commentBlogItemMapper::toDto);
    }

    @Override
    public Page<CommentBlogItemWithAuthorDTO> findByItem(Long idBlogItem, Pageable pageable) {
        log.debug("Request to get all CommentBlogItems");
        return commentBlogItemRepository.findByBlogItem_Id(idBlogItem,pageable)
            .map(commentBlogItemWithAuthorMapper::toDto);
    }
}
