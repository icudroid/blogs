package fr.edaz.blog.repository;

import fr.edaz.blog.domain.BlogItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the BlogItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogItemRepository extends JpaRepository<BlogItem, Long> {

    @Query("select blog_item from BlogItem blog_item where blog_item.author.login = ?#{principal.username}")
    List<BlogItem> findByAuthorIsCurrentUser();

    @Query("select blog_item from BlogItem blog_item where blog_item.author.login = ?#{principal.username}")
    Page<BlogItem> findByAuthorIsCurrentUser(Pageable pageable);

    @Query("select distinct blog_item from BlogItem blog_item left join fetch blog_item.tags")
    List<BlogItem> findAllWithEagerRelationships();

    @Query("select blog_item from BlogItem blog_item left join fetch blog_item.tags where blog_item.id =:id")
    BlogItem findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select blog_item from BlogItem blog_item where blog_item.blog.title =:blogName")
    Page<BlogItem> findAllByBlogTitle(@Param("blogName")String blogName, Pageable pageable);

    @Query("select blog_item from BlogItem blog_item join blog_item.tags as tag where blog_item.blog.title =:blogName and tag.tagName =:tagName")
    Page<BlogItem> findAllByBlogTitleAndTagName(@Param("blogName")String blogName, @Param("tagName")String tagName, Pageable pageable);

}
