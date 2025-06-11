package com.find.event.mapper.annotations;

import org.mapstruct.Mapping;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Mapping(target = "createdAt", ignore = true)
@Mapping(target = "lastUpdatedAt", ignore = true)
@Mapping(target = "createdBy", ignore = true)
@Mapping(target = "updatedBy", ignore = true)
@Mapping(target = "version", ignore = true)
public @interface IgnoreAuditMappings {
}
