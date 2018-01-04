package fr.edaz.blog.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import fr.edaz.blog.domain.enumeration.CommentBlogStatus;

/**
 * A DTO for the CommentBlogItem entity.
 */
public class CommentBlogItemDTO implements Serializable {

    private Long id;

    @Size(min = 3, max = 60)
    private String title;

    @NotNull
    @Size(min = 3, max = 512)
    private String text;

    private ZonedDateTime created;

    private ZonedDateTime updated;

    private CommentBlogStatus status;

    private Long blogItemId;

    private Long commentBlogItemId;

    private Long authorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(ZonedDateTime updated) {
        this.updated = updated;
    }

    public CommentBlogStatus getStatus() {
        return status;
    }

    public void setStatus(CommentBlogStatus status) {
        this.status = status;
    }

    public Long getBlogItemId() {
        return blogItemId;
    }

    public void setBlogItemId(Long blogItemId) {
        this.blogItemId = blogItemId;
    }

    public Long getCommentBlogItemId() {
        return commentBlogItemId;
    }

    public void setCommentBlogItemId(Long commentBlogItemId) {
        this.commentBlogItemId = commentBlogItemId;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long userId) {
        this.authorId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommentBlogItemDTO commentBlogItemDTO = (CommentBlogItemDTO) o;
        if(commentBlogItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentBlogItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommentBlogItemDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", text='" + getText() + "'" +
            ", created='" + getCreated() + "'" +
            ", updated='" + getUpdated() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
