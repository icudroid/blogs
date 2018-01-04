package fr.edaz.blog.repository;

import fr.edaz.blog.domain.Blog;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    Blog findByAuthorLogin(String login);

    Blog findByTitle(String blogName);
}
