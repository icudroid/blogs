package fr.edaz.blog.service.dto;


import java.util.List;

/**
 * A DTO for the CommentBlogItem entity.
 */
public class CommentBlogItemWithAuthorDTO extends CommentBlogItemDTO {
    private AuthorDTO author;
    private List<CommentBlogItemWithAuthorDTO> replies;


    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }

    public List<CommentBlogItemWithAuthorDTO> getReplies() {
        return replies;
    }

    public void setReplies(List<CommentBlogItemWithAuthorDTO> replies) {
        this.replies = replies;
    }
}
