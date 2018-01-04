package fr.edaz.blog.repository;

import fr.edaz.blog.domain.CommentBlogItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the CommentBlogItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentBlogItemRepository extends JpaRepository<CommentBlogItem, Long> {

    @Query("select comment_blog_item from CommentBlogItem comment_blog_item where comment_blog_item.author.login = ?#{principal.username}")
    List<CommentBlogItem> findByAuthorIsCurrentUser();

    Page<CommentBlogItem> findByBlogItem_Id(Long idBlogItem, Pageable pageable);

}
