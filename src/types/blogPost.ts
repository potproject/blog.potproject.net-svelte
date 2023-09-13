export type BlogPost = {
    metadata: Metadata;
    sys:      BlogPostSys;
    fields:   Fields;
}

export type Fields = {
    title:         FieldsString;
    createdDate:   FieldsString;
    content:       FieldsString;
    tags?:          Tags;
    url:           FieldsString;
    headerBackgroundColor?: FieldsString;
    redirectPath?: FieldsString;
    headerImgur?: FieldsString;
    hiddenPage?:   FieldsBoolean;
}

export type FieldsString = {
    [lang: string]: string

}

export type FieldsBoolean = {
    [lang: string]: boolean;
}

export type Tags = {
    [lang: string]: string[];
}

export type Metadata = {
    tags: any[];
}

export type BlogPostSys = {
    space:            ContentType;
    id:               string;
    type:             string;
    createdAt:        Date;
    updatedAt:        Date;
    environment:      ContentType;
    publishedVersion: number;
    publishedAt:      Date;
    firstPublishedAt: Date;
    createdBy:        ContentType;
    updatedBy:        ContentType;
    publishedCounter: number;
    version:          number;
    publishedBy:      ContentType;
    automationTags:   any[];
    contentType:      ContentType;
}

export type ContentType = {
    sys: ContentTypeSys;
}

export type ContentTypeSys = {
    type:     string;
    linkType: string;
    id:       string;
}