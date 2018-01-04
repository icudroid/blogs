package fr.edaz.blog.repository.search;

import fr.edaz.blog.domain.BlogItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the BlogItem entity.
 */
public interface BlogItemSearchRepository extends ElasticsearchRepository<BlogItem, Long> {
}
