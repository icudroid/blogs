package fr.edaz.blog.service.mapper;

import fr.edaz.blog.domain.*;
import fr.edaz.blog.service.dto.BlogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Blog and its DTO BlogDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BlogMapper extends EntityMapper<BlogDTO, Blog> {

    @Mapping(source = "author.id", target = "authorId")
    BlogDTO toDto(Blog blog); 

    @Mapping(source = "authorId", target = "author")
    @Mapping(target = "items", ignore = true)
    Blog toEntity(BlogDTO blogDTO);

    default Blog fromId(Long id) {
        if (id == null) {
            return null;
        }
        Blog blog = new Blog();
        blog.setId(id);
        return blog;
    }
}
