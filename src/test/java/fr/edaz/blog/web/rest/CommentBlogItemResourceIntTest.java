package fr.edaz.blog.web.rest;

import fr.edaz.blog.BlogsApp;
import fr.edaz.blog.domain.CommentBlogItem;
import fr.edaz.blog.domain.enumeration.CommentBlogStatus;
import fr.edaz.blog.repository.CommentBlogItemRepository;
import fr.edaz.blog.repository.search.CommentBlogItemSearchRepository;
import fr.edaz.blog.service.CommentBlogItemService;
import fr.edaz.blog.service.UserService;
import fr.edaz.blog.service.dto.CommentBlogItemDTO;
import fr.edaz.blog.service.mapper.CommentBlogItemMapper;
import fr.edaz.blog.web.rest.errors.ExceptionTranslator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

import static fr.edaz.blog.web.rest.TestUtil.createFormattingConversionService;
import static fr.edaz.blog.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CommentBlogItemResource REST controller.
 *
 * @see CommentBlogItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogsApp.class)
public class CommentBlogItemResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final CommentBlogStatus DEFAULT_STATUS = CommentBlogStatus.CREATED;
    private static final CommentBlogStatus UPDATED_STATUS = CommentBlogStatus.VALIDATED;

    @Autowired
    private CommentBlogItemRepository commentBlogItemRepository;

    @Autowired
    private CommentBlogItemMapper commentBlogItemMapper;

    @Autowired
    private CommentBlogItemService commentBlogItemService;

    @Autowired
    private CommentBlogItemSearchRepository commentBlogItemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private UserService userService;


    @Autowired
    private EntityManager em;

    private MockMvc restCommentBlogItemMockMvc;

    private CommentBlogItem commentBlogItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommentBlogItemResource commentBlogItemResource = new CommentBlogItemResource(commentBlogItemService, userService);
        this.restCommentBlogItemMockMvc = MockMvcBuilders.standaloneSetup(commentBlogItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentBlogItem createEntity(EntityManager em) {
        CommentBlogItem commentBlogItem = new CommentBlogItem()
            .title(DEFAULT_TITLE)
            .text(DEFAULT_TEXT)
            .created(DEFAULT_CREATED)
            .updated(DEFAULT_UPDATED)
            .status(DEFAULT_STATUS);
        return commentBlogItem;
    }

    @Before
    public void initTest() {
        commentBlogItemSearchRepository.deleteAll();
        commentBlogItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommentBlogItem() throws Exception {
        int databaseSizeBeforeCreate = commentBlogItemRepository.findAll().size();

        // Create the CommentBlogItem
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);
        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CommentBlogItem in the database
        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeCreate + 1);
        CommentBlogItem testCommentBlogItem = commentBlogItemList.get(commentBlogItemList.size() - 1);
        assertThat(testCommentBlogItem.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCommentBlogItem.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testCommentBlogItem.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testCommentBlogItem.getUpdated()).isEqualTo(DEFAULT_UPDATED);
        assertThat(testCommentBlogItem.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the CommentBlogItem in Elasticsearch
        CommentBlogItem commentBlogItemEs = commentBlogItemSearchRepository.findOne(testCommentBlogItem.getId());
        assertThat(testCommentBlogItem.getCreated()).isEqualTo(testCommentBlogItem.getCreated());
        assertThat(testCommentBlogItem.getUpdated()).isEqualTo(testCommentBlogItem.getUpdated());
        assertThat(commentBlogItemEs).isEqualToIgnoringGivenFields(testCommentBlogItem, "created", "updated");
    }

    @Test
    @Transactional
    public void createCommentBlogItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commentBlogItemRepository.findAll().size();

        // Create the CommentBlogItem with an existing ID
        commentBlogItem.setId(1L);
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommentBlogItem in the database
        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentBlogItemRepository.findAll().size();
        // set the field null
        commentBlogItem.setTitle(null);

        // Create the CommentBlogItem, which fails.
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isBadRequest());

        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentBlogItemRepository.findAll().size();
        // set the field null
        commentBlogItem.setText(null);

        // Create the CommentBlogItem, which fails.
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isBadRequest());

        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentBlogItemRepository.findAll().size();
        // set the field null
        commentBlogItem.setCreated(null);

        // Create the CommentBlogItem, which fails.
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isBadRequest());

        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentBlogItemRepository.findAll().size();
        // set the field null
        commentBlogItem.setStatus(null);

        // Create the CommentBlogItem, which fails.
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        restCommentBlogItemMockMvc.perform(post("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isBadRequest());

        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommentBlogItems() throws Exception {
        // Initialize the database
        commentBlogItemRepository.saveAndFlush(commentBlogItem);

        // Get all the commentBlogItemList
        restCommentBlogItemMockMvc.perform(get("/api/comment-blog-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commentBlogItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(sameInstant(DEFAULT_UPDATED))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getCommentBlogItem() throws Exception {
        // Initialize the database
        commentBlogItemRepository.saveAndFlush(commentBlogItem);

        // Get the commentBlogItem
        restCommentBlogItemMockMvc.perform(get("/api/comment-blog-items/{id}", commentBlogItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commentBlogItem.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.updated").value(sameInstant(DEFAULT_UPDATED)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommentBlogItem() throws Exception {
        // Get the commentBlogItem
        restCommentBlogItemMockMvc.perform(get("/api/comment-blog-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommentBlogItem() throws Exception {
        // Initialize the database
        commentBlogItemRepository.saveAndFlush(commentBlogItem);
        commentBlogItemSearchRepository.save(commentBlogItem);
        int databaseSizeBeforeUpdate = commentBlogItemRepository.findAll().size();

        // Update the commentBlogItem
        CommentBlogItem updatedCommentBlogItem = commentBlogItemRepository.findOne(commentBlogItem.getId());
        // Disconnect from session so that the updates on updatedCommentBlogItem are not directly saved in db
        em.detach(updatedCommentBlogItem);
        updatedCommentBlogItem
            .title(UPDATED_TITLE)
            .text(UPDATED_TEXT)
            .created(UPDATED_CREATED)
            .updated(UPDATED_UPDATED)
            .status(UPDATED_STATUS);
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(updatedCommentBlogItem);

        restCommentBlogItemMockMvc.perform(put("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isOk());

        // Validate the CommentBlogItem in the database
        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeUpdate);
        CommentBlogItem testCommentBlogItem = commentBlogItemList.get(commentBlogItemList.size() - 1);
        assertThat(testCommentBlogItem.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCommentBlogItem.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testCommentBlogItem.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testCommentBlogItem.getUpdated()).isEqualTo(UPDATED_UPDATED);
        assertThat(testCommentBlogItem.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the CommentBlogItem in Elasticsearch
        CommentBlogItem commentBlogItemEs = commentBlogItemSearchRepository.findOne(testCommentBlogItem.getId());
        assertThat(testCommentBlogItem.getCreated()).isEqualTo(testCommentBlogItem.getCreated());
        assertThat(testCommentBlogItem.getUpdated()).isEqualTo(testCommentBlogItem.getUpdated());
        assertThat(commentBlogItemEs).isEqualToIgnoringGivenFields(testCommentBlogItem, "created", "updated");
    }

    @Test
    @Transactional
    public void updateNonExistingCommentBlogItem() throws Exception {
        int databaseSizeBeforeUpdate = commentBlogItemRepository.findAll().size();

        // Create the CommentBlogItem
        CommentBlogItemDTO commentBlogItemDTO = commentBlogItemMapper.toDto(commentBlogItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCommentBlogItemMockMvc.perform(put("/api/comment-blog-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentBlogItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CommentBlogItem in the database
        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCommentBlogItem() throws Exception {
        // Initialize the database
        commentBlogItemRepository.saveAndFlush(commentBlogItem);
        commentBlogItemSearchRepository.save(commentBlogItem);
        int databaseSizeBeforeDelete = commentBlogItemRepository.findAll().size();

        // Get the commentBlogItem
        restCommentBlogItemMockMvc.perform(delete("/api/comment-blog-items/{id}", commentBlogItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean commentBlogItemExistsInEs = commentBlogItemSearchRepository.exists(commentBlogItem.getId());
        assertThat(commentBlogItemExistsInEs).isFalse();

        // Validate the database is empty
        List<CommentBlogItem> commentBlogItemList = commentBlogItemRepository.findAll();
        assertThat(commentBlogItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCommentBlogItem() throws Exception {
        // Initialize the database
        commentBlogItemRepository.saveAndFlush(commentBlogItem);
        commentBlogItemSearchRepository.save(commentBlogItem);

        // Search the commentBlogItem
        restCommentBlogItemMockMvc.perform(get("/api/_search/comment-blog-items?query=id:" + commentBlogItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commentBlogItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(sameInstant(DEFAULT_UPDATED))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommentBlogItem.class);
        CommentBlogItem commentBlogItem1 = new CommentBlogItem();
        commentBlogItem1.setId(1L);
        CommentBlogItem commentBlogItem2 = new CommentBlogItem();
        commentBlogItem2.setId(commentBlogItem1.getId());
        assertThat(commentBlogItem1).isEqualTo(commentBlogItem2);
        commentBlogItem2.setId(2L);
        assertThat(commentBlogItem1).isNotEqualTo(commentBlogItem2);
        commentBlogItem1.setId(null);
        assertThat(commentBlogItem1).isNotEqualTo(commentBlogItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommentBlogItemDTO.class);
        CommentBlogItemDTO commentBlogItemDTO1 = new CommentBlogItemDTO();
        commentBlogItemDTO1.setId(1L);
        CommentBlogItemDTO commentBlogItemDTO2 = new CommentBlogItemDTO();
        assertThat(commentBlogItemDTO1).isNotEqualTo(commentBlogItemDTO2);
        commentBlogItemDTO2.setId(commentBlogItemDTO1.getId());
        assertThat(commentBlogItemDTO1).isEqualTo(commentBlogItemDTO2);
        commentBlogItemDTO2.setId(2L);
        assertThat(commentBlogItemDTO1).isNotEqualTo(commentBlogItemDTO2);
        commentBlogItemDTO1.setId(null);
        assertThat(commentBlogItemDTO1).isNotEqualTo(commentBlogItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(commentBlogItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(commentBlogItemMapper.fromId(null)).isNull();
    }
}
