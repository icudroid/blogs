package fr.edaz.blog.service;

import fr.edaz.blog.service.dto.BlogDTO;
import java.util.List;

/**
 * Service Interface for managing Blog.
 */
public interface BlogService {

    /**
     * Save a blog.
     *
     * @param blogDTO the entity to save
     * @return the persisted entity
     */
    BlogDTO save(BlogDTO blogDTO);

    /**
     * Get all the blogs.
     *
     * @return the list of entities
     */
    List<BlogDTO> findAll();

    /**
     * Get the "id" blog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BlogDTO findOne(Long id);

    /**
     * Delete the "id" blog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the blog corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<BlogDTO> search(String query);

    /**
     *
     * @param username
     * @return
     */
    BlogDTO findByUsername(String username);
}
