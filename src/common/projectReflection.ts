import {
  ReflectionContainer,
  SignatureReflectionObject,
  DeclarationReflectionContainer,
  ReflectionGroupObject,
  GroupsContainer,
  SourceReferenceContainer,
  SourceReferenceObject,
  TypeContainer,
  ContainerReflectionContainer,
  CommentContainer,
  CommentObject,
} from "typedoc/dist/lib/serialization/browser";

export interface ProjectReflectionLvl4
  extends ReflectionContainer,
    Partial<GroupsContainer<ReflectionGroupObject>>,
    SourceReferenceContainer<SourceReferenceObject>,
    DeclarationReflectionContainer<SignatureReflectionObject> {}

export interface ProjectReflectionLvl3
  extends ReflectionContainer,
    Partial<GroupsContainer<ReflectionGroupObject>>,
    SourceReferenceContainer<SourceReferenceObject>,
    Partial<TypeContainer>,
    Partial<CommentContainer<CommentObject>> {
  children?: ProjectReflectionLvl4[];
}

export interface ProjectReflectionLvl2
  extends ReflectionContainer,
    GroupsContainer<ReflectionGroupObject>,
    SourceReferenceContainer<SourceReferenceObject>,
    DeclarationReflectionContainer<SignatureReflectionObject> {
  children: ProjectReflectionLvl3[];
}

export interface ProjectReflection
  extends Partial<ReflectionContainer>,
    Partial<GroupsContainer<ReflectionGroupObject>> {
  children: ProjectReflectionLvl2[];
}
