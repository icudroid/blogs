package fr.edaz.blog.service.mapper;

import fr.edaz.blog.domain.CommentBlogItem;
import fr.edaz.blog.service.dto.CommentBlogItemDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CommentBlogItem and its DTO CommentBlogItemDTO.
 */
@Mapper(componentModel = "spring", uses = {BlogItemMapper.class, UserMapper.class})
public interface CommentBlogItemMapper extends EntityMapper<CommentBlogItemDTO, CommentBlogItem> {

    @Mapping(source = "blogItem.id", target = "blogItemId")
    @Mapping(source = "commentBlogItem.id", target = "commentBlogItemId")
    @Mapping(source = "author.id", target = "authorId")
    CommentBlogItemDTO toDto(CommentBlogItem commentBlogItem);

    @Mapping(source = "blogItemId", target = "blogItem")
    @Mapping(source = "commentBlogItemId", target = "commentBlogItem")
    @Mapping(target = "replies", ignore = true)
    @Mapping(source = "authorId", target = "author")
    CommentBlogItem toEntity(CommentBlogItemDTO commentBlogItemDTO);

    default CommentBlogItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        CommentBlogItem commentBlogItem = new CommentBlogItem();
        commentBlogItem.setId(id);
        return commentBlogItem;
    }
}
