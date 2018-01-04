package fr.edaz.blog.service.mapper;

import fr.edaz.blog.domain.*;
import fr.edaz.blog.service.dto.TagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tag and its DTO TagDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TagMapper extends EntityMapper<TagDTO, Tag> {

    

    

    default Tag fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tag tag = new Tag();
        tag.setId(id);
        return tag;
    }
}
