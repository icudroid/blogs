package fr.edaz.blog.service.mapper;

import fr.edaz.blog.domain.*;
import fr.edaz.blog.service.dto.BlogItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BlogItem and its DTO BlogItemDTO.
 */
@Mapper(componentModel = "spring", uses = {BlogMapper.class, UserMapper.class, TagMapper.class})
public interface BlogItemMapper extends EntityMapper<BlogItemDTO, BlogItem> {

    @Mapping(source = "blog.id", target = "blogId")
    @Mapping(source = "author.id", target = "authorId")
    BlogItemDTO toDto(BlogItem blogItem); 

    @Mapping(source = "blogId", target = "blog")
    @Mapping(target = "comments", ignore = true)
    @Mapping(source = "authorId", target = "author")
    BlogItem toEntity(BlogItemDTO blogItemDTO);

    default BlogItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        BlogItem blogItem = new BlogItem();
        blogItem.setId(id);
        return blogItem;
    }
}
