package fr.edaz.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import fr.edaz.blog.domain.enumeration.CommentBlogStatus;

/**
 * A CommentBlogItem.
 */
@Entity
@Table(name = "comment_blog_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "commentblogitem")
public class CommentBlogItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 60)
    @Column(name = "title", length = 60, nullable = false)
    private String title;

    @NotNull
    @Size(min = 3, max = 512)
    @Column(name = "text", length = 512, nullable = false)
    private String text;

    @NotNull
    @Column(name = "created", nullable = false)
    private ZonedDateTime created;

    @Column(name = "updated")
    private ZonedDateTime updated;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CommentBlogStatus status;

    @ManyToOne
    private BlogItem blogItem;

    @ManyToOne
    private CommentBlogItem commentBlogItem;

    @OneToMany(mappedBy = "commentBlogItem")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CommentBlogItem> replies = new HashSet<>();

    @ManyToOne
    private User author;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public CommentBlogItem title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public CommentBlogItem text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public CommentBlogItem created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public CommentBlogItem updated(ZonedDateTime updated) {
        this.updated = updated;
        return this;
    }

    public void setUpdated(ZonedDateTime updated) {
        this.updated = updated;
    }

    public CommentBlogStatus getStatus() {
        return status;
    }

    public CommentBlogItem status(CommentBlogStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(CommentBlogStatus status) {
        this.status = status;
    }

    public BlogItem getBlogItem() {
        return blogItem;
    }

    public CommentBlogItem blogItem(BlogItem blogItem) {
        this.blogItem = blogItem;
        return this;
    }

    public void setBlogItem(BlogItem blogItem) {
        this.blogItem = blogItem;
    }

    public CommentBlogItem getCommentBlogItem() {
        return commentBlogItem;
    }

    public CommentBlogItem commentBlogItem(CommentBlogItem commentBlogItem) {
        this.commentBlogItem = commentBlogItem;
        return this;
    }

    public void setCommentBlogItem(CommentBlogItem commentBlogItem) {
        this.commentBlogItem = commentBlogItem;
    }

    public Set<CommentBlogItem> getReplies() {
        return replies;
    }

    public CommentBlogItem replies(Set<CommentBlogItem> commentBlogItems) {
        this.replies = commentBlogItems;
        return this;
    }

    public CommentBlogItem addReplies(CommentBlogItem commentBlogItem) {
        this.replies.add(commentBlogItem);
        commentBlogItem.setCommentBlogItem(this);
        return this;
    }

    public CommentBlogItem removeReplies(CommentBlogItem commentBlogItem) {
        this.replies.remove(commentBlogItem);
        commentBlogItem.setCommentBlogItem(null);
        return this;
    }

    public void setReplies(Set<CommentBlogItem> commentBlogItems) {
        this.replies = commentBlogItems;
    }

    public User getAuthor() {
        return author;
    }

    public CommentBlogItem author(User user) {
        this.author = user;
        return this;
    }

    public void setAuthor(User user) {
        this.author = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CommentBlogItem commentBlogItem = (CommentBlogItem) o;
        if (commentBlogItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentBlogItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommentBlogItem{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", text='" + getText() + "'" +
            ", created='" + getCreated() + "'" +
            ", updated='" + getUpdated() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
