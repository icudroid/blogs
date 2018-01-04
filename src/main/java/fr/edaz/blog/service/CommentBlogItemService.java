package fr.edaz.blog.service;

import fr.edaz.blog.service.dto.CommentBlogItemDTO;
import fr.edaz.blog.service.dto.CommentBlogItemWithAuthorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CommentBlogItem.
 */
public interface CommentBlogItemService {

    /**
     * Save a commentBlogItem.
     *
     * @param commentBlogItemDTO the entity to save
     * @return the persisted entity
     */
    CommentBlogItemDTO save(CommentBlogItemDTO commentBlogItemDTO);

    /**
     * Get all the commentBlogItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CommentBlogItemDTO> findAll(Pageable pageable);

    /**
     * Get the "id" commentBlogItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CommentBlogItemDTO findOne(Long id);

    /**
     * Delete the "id" commentBlogItem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the commentBlogItem corresponding to the query.
     *
     * @param query the query of the search
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CommentBlogItemDTO> search(String query, Pageable pageable);

    Page<CommentBlogItemWithAuthorDTO> findByItem(Long idBlogItem, Pageable pageable);
}
