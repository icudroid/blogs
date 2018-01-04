package fr.edaz.blog.repository.search;

import fr.edaz.blog.domain.CommentBlogItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CommentBlogItem entity.
 */
public interface CommentBlogItemSearchRepository extends ElasticsearchRepository<CommentBlogItem, Long> {
}
