package fr.edaz.blog.service.mapper;

import fr.edaz.blog.domain.CommentBlogItem;
import fr.edaz.blog.service.dto.AuthorDTO;
import fr.edaz.blog.service.dto.CommentBlogItemWithAuthorDTO;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

/**
 * Mapper for the entity CommentBlogItem and its DTO CommentBlogItemDTO.
 */
@Service
public class CommentBlogItemWithAuthorMapper {


    public  CommentBlogItemWithAuthorDTO toDto(CommentBlogItem commentBlogItem){
        CommentBlogItemWithAuthorDTO res = new CommentBlogItemWithAuthorDTO();
        res.setAuthor(new AuthorDTO(commentBlogItem.getAuthor()));

        res.setAuthorId(commentBlogItem.getAuthor().getId());
        res.setBlogItemId(commentBlogItem.getBlogItem().getId());
        res.setCreated(commentBlogItem.getCreated());
        res.setId(commentBlogItem.getId());
        res.setStatus(commentBlogItem.getStatus());
        res.setText(commentBlogItem.getText());
        res.setCommentBlogItemId((commentBlogItem.getCommentBlogItem() !=null)?commentBlogItem.getCommentBlogItem().getId():null);
        res.setTitle(commentBlogItem.getTitle());
        res.setUpdated(commentBlogItem.getUpdated());
        res.setReplies(commentBlogItem.getReplies().stream().map(this::toDto).collect(Collectors.toList()));
        return res;
    }
}
