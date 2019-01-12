export const AKAMAI_SHARED_CDN: string;
export const BLANK: string;
export const CF_SHARED_CDN: string;
export namespace Cache {
  class CacheAdapter {
    constructor(storage: any);
    flushAll(): void;
    get(
      publicId: any,
      type: any,
      resourceType: any,
      transformation: any,
      format: any
    ): void;
    set(
      publicId: any,
      type: any,
      resourceType: any,
      transformation: any,
      format: any,
      value: any
    ): void;
  }
  const adapter: any;
  function flushAll(): any;
  function get(publicId: any, options: any): any;
  function getAdapter(): any;
  const instance: any;
  function set(publicId: any, options: any, value: any): any;
  class setAdapter {
    constructor(adapter: any);
    adapter: any;
  }
}
export class PreloadedFile {
  constructor(file_info: any);
  resource_type: any;
  type: any;
  version: any;
  filename: any;
  signature: any;
  public_id: any;
  format: any;
  identifier(): any;
  is_valid(): any;
  split_format(identifier: any): any;
  toJSON(): any;
}
export const SHARED_CDN: string;
export namespace api {
  function create_streaming_profile(
    name: any,
    callback: any,
    options: any
  ): any;
  function create_transformation(
    name: any,
    definition: any,
    callback: any,
    options: any
  ): any;
  function create_upload_mapping(name: any, callback: any, options: any): any;
  function create_upload_preset(callback: any, options: any): any;
  function delete_all_resources(callback: any, options: any): any;
  function delete_derived_by_transformation(
    public_ids: any,
    transformations: any,
    callback: any,
    options: any
  ): any;
  function delete_derived_resources(
    derived_resource_ids: any,
    callback: any,
    options: any
  ): any;
  function delete_resources(public_ids: any, callback: any, options: any): any;
  function delete_resources_by_prefix(
    prefix: any,
    callback: any,
    options: any
  ): any;
  function delete_resources_by_tag(tag: any, callback: any, options: any): any;
  function delete_streaming_profile(
    name: any,
    callback: any,
    options: any
  ): any;
  function delete_transformation(
    transformation: any,
    callback: any,
    options: any
  ): any;
  function delete_upload_mapping(name: any, callback: any, options: any): any;
  function delete_upload_preset(name: any, callback: any, options: any): any;
  function get_streaming_profile(name: any, callback: any, options: any): any;
  function list_streaming_profiles(callback: any, options: any): any;
  function ping(callback: any, options: any): any;
  function publish_by_ids(public_ids: any, callback: any, options: any): any;
  function publish_by_prefix(prefix: any, callback: any, options: any): any;
  function publish_by_tag(tag: any, callback: any, options: any): any;
  function resource(public_id: any, callback: any, options: any): any;
  function resource_types(callback: any, options: any): any;
  function resources(callback: any, options: any): any;
  function resources_by_context(
    key: any,
    value: any,
    callback: any,
    options: any
  ): any;
  function resources_by_ids(public_ids: any, callback: any, options: any): any;
  function resources_by_moderation(
    kind: any,
    status: any,
    callback: any,
    options: any
  ): any;
  function resources_by_tag(tag: any, callback: any, options: any): any;
  function restore(public_ids: any, callback: any, options: any): any;
  function root_folders(callback: any, options: any): any;
  function search(params: any, callback: any, options: any): any;
  function sub_folders(path: any, callback: any, options: any): any;
  function tags(callback: any, options: any): any;
  function transformation(
    transformation: any,
    callback: any,
    options: any
  ): any;
  function transformations(callback: any, options: any): any;
  function update(public_id: any, callback: any, options: any): any;
  function update_resources_access_mode_by_ids(
    access_mode: any,
    ids: any,
    callback: any,
    options: any
  ): any;
  function update_resources_access_mode_by_prefix(
    access_mode: any,
    prefix: any,
    callback: any,
    options: any
  ): any;
  function update_resources_access_mode_by_tag(
    access_mode: any,
    tag: any,
    callback: any,
    options: any
  ): any;
  function update_streaming_profile(
    name: any,
    callback: any,
    options: any
  ): any;
  function update_transformation(
    transformation: any,
    updates: any,
    callback: any,
    options: any
  ): any;
  function update_upload_mapping(name: any, callback: any, options: any): any;
  function update_upload_preset(name: any, callback: any, options: any): any;
  function upload_mapping(name: any, callback: any, options: any): any;
  function upload_mappings(callback: any, options: any): any;
  function upload_preset(name: any, callback: any, options: any): any;
  function upload_presets(callback: any, options: any): any;
  function usage(callback: any, options: any): any;
}
export function cloudinary_js_config(): any;
export function config(new_config: any, new_value?: any): any;
export function image(source: any, options: any): any;
export function picture(public_id: any, options: any): any;
export function source(public_id: any, options: any): any;
export namespace uploader {
  function add_context(
    context: any,
    public_ids: any,
    callback: any,
    options: any
  ): any;
  function add_tag(tag: any, public_ids: any, callback: any, options: any): any;
  function create_archive(callback: any, options: any, target_format: any): any;
  function create_zip(callback: any, options: any): any;
  function destroy(public_id: any, callback: any, options: any): any;
  function direct_upload(callback_url: any, options: any): any;
  function explicit(public_id: any, callback: any, options: any): any;
  function explode(public_id: any, callback: any, options: any): any;
  function generate_sprite(tag: any, callback: any, options: any): any;
  function image_upload_tag(field: any, options: any): any;
  function multi(tag: any, callback: any, options: any): any;
  function remove_all_context(
    public_ids: any,
    callback: any,
    options: any
  ): any;
  function remove_all_tags(public_ids: any, callback: any, options: any): any;
  function remove_tag(
    tag: any,
    public_ids: any,
    callback: any,
    options: any
  ): any;
  function rename(
    from_public_id: any,
    to_public_id: any,
    callback: any,
    options: any
  ): any;
  function replace_tag(
    tag: any,
    public_ids: any,
    callback: any,
    options: any
  ): any;
  function text(text: any, callback: any, options: any): any;
  function unsigned_image_upload_tag(
    field: any,
    upload_preset: any,
    options: any
  ): any;
  function unsigned_upload(
    file: any,
    upload_preset: any,
    callback: any,
    options: any
  ): any;
  function unsigned_upload_stream(
    upload_preset: any,
    callback: any,
    options: any
  ): any;
  function upload(file: any, callback: any, options: any): any;
  function upload_chunked(path: any, callback: any, options: any): any;
  function upload_chunked_stream(callback: any, options: any): any;
  function upload_large(path: any, callback: any, options: any): any;
  function upload_large_stream(_unused_: any, callback: any, options: any): any;
  function upload_stream(callback: any, options: any): any;
  function upload_tag_params(options: any): any;
  function upload_url(options: any): any;
}
export function url(public_id: any, options: any): any;
export namespace utils {
  const AKAMAI_SHARED_CDN: string;
  const CF_SHARED_CDN: string;
  const DEFAULT_POSTER_OPTIONS: {
    format: string;
    resource_type: string;
  };
  const DEFAULT_VIDEO_SOURCE_TYPES: string[];
  function NOP(): void;
  const OLD_AKAMAI_SHARED_CDN: string;
  const SHARED_CDN: string;
  const USER_AGENT: string;
  const VERSION: string;
  function api_sign_request(params_to_sign: any, api_secret: any): any;
  function api_url(action: any, options: any): any;
  function archive_params(options: any): any;
  function as_safe_bool(value: any): any;
  function at(...args: any[]): any;
  function build_array(arg: any): any;
  function build_custom_headers(headers: any): any;
  function build_eager(transformations: any): any;
  function build_explicit_api_params(public_id: any, options: any): any;
  function build_streaming_profiles_param(options: any): any;
  function build_upload_params(options: any): any;
  function clear_blank(hash: any): any;
  function clone(value: any): any;
  function cloudinary_js_config(): any;
  function download_archive_url(options: any): any;
  function download_zip_url(options: any): any;
  function encode_context(arg: any): any;
  function encode_double_array(array: any): any;
  function encode_key_value(arg: any): any;
  function ensurePresenceOf(parameters: any): void;
  function extend(...args: any[]): any;
  function extractTransformationParams(options: any): any;
  function extractUrlParams(options: any): any;
  function filter(collection: any, predicate: any): any;
  function generate_auth_token(options: any): any;
  function generate_responsive_breakpoints_string(breakpoints: any): any;
  function generate_transformation_string(options: any): any;
  function getUserAgent(): any;
  function html_attrs(attrs: any): any;
  function includes(
    collection: any,
    value: any,
    fromIndex: any,
    guard: any
  ): any;
  function isArray(p0: any): any;
  function isEmpty(value: any): any;
  function isNumber(value: any): any;
  function isObject(value: any): any;
  function isString(value: any): any;
  function isUndefined(value: any): any;
  function jsonArrayParam(data: any, modifier: any): any;
  function keys(object: any): any;
  function merge(hash1: any, hash2: any): any;
  function only(source: any, keys: any): any;
  function option_consume(
    options: any,
    option_name: any,
    default_value: any
  ): any;
  function patchFetchFormat(options: any): void;
  function present(value: any): any;
  function private_download_url(public_id: any, format: any, options: any): any;
  function process_request_params(params: any, options: any): any;
  function random_public_id(): any;
  function sign_request(params: any, options: any): any;
  function signed_preloaded_image(result: any): any;
  function timestamp(): any;
  function updateable_resource_params(options: any, params: any): any;
  function url(public_id: any, options: any): any;
  const userPlatform: string;
  function v1_adapters(exports: any, v1: any, mapping: any): any;
  function video_thumbnail_url(public_id: any, options: any): any;
  function video_url(public_id: any, options: any): any;
  function webhook_signature(data: any, timestamp: any, options: any): any;
  function zip_download_url(tag: any, options: any): any;
}
export namespace v2 {
  const AKAMAI_SHARED_CDN: string;
  const BLANK: string;
  const CF_SHARED_CDN: string;
  namespace Cache {
    class CacheAdapter {
      constructor(storage: any);
      flushAll(): void;
      get(
        publicId: any,
        type: any,
        resourceType: any,
        transformation: any,
        format: any
      ): void;
      set(
        publicId: any,
        type: any,
        resourceType: any,
        transformation: any,
        format: any,
        value: any
      ): void;
    }
    const adapter: any;
    function flushAll(): any;
    function get(publicId: any, options: any): any;
    function getAdapter(): any;
    const instance: any;
    function set(publicId: any, options: any, value: any): any;
    class setAdapter {
      constructor(adapter: any);
      adapter: any;
    }
  }
  class PreloadedFile {
    constructor(file_info: any);
    resource_type: any;
    type: any;
    version: any;
    filename: any;
    signature: any;
    public_id: any;
    format: any;
    identifier(): any;
    is_valid(): any;
    split_format(identifier: any): any;
    toJSON(): any;
  }
  const SHARED_CDN: string;
  namespace api {
    function create_streaming_profile(args: any): any;
    function create_transformation(args: any): any;
    function create_upload_mapping(args: any): any;
    function create_upload_preset(args: any): any;
    function delete_all_resources(args: any): any;
    function delete_derived_by_transformation(args: any): any;
    function delete_derived_resources(args: any): any;
    function delete_resources(args: any): any;
    function delete_resources_by_prefix(args: any): any;
    function delete_resources_by_tag(args: any): any;
    function delete_streaming_profile(args: any): any;
    function delete_transformation(args: any): any;
    function delete_upload_mapping(args: any): any;
    function delete_upload_preset(args: any): any;
    function get_streaming_profile(args: any): any;
    function list_streaming_profiles(args: any): any;
    function ping(args: any): any;
    function publish_by_ids(args: any): any;
    function publish_by_prefix(args: any): any;
    function publish_by_tag(args: any): any;
    function resource(args: any): any;
    function resource_types(args: any): any;
    function resources(args: any): any;
    function resources_by_context(args: any): any;
    function resources_by_ids(args: any): any;
    function resources_by_moderation(args: any): any;
    function resources_by_tag(args: any): any;
    function restore(args: any): any;
    function root_folders(args: any): any;
    function search(args: any): any;
    function sub_folders(args: any): any;
    function tags(args: any): any;
    function transformation(args: any): any;
    function transformations(args: any): any;
    function update(args: any): any;
    function update_resources_access_mode_by_ids(args: any): any;
    function update_resources_access_mode_by_prefix(args: any): any;
    function update_resources_access_mode_by_tag(args: any): any;
    function update_streaming_profile(args: any): any;
    function update_transformation(args: any): any;
    function update_upload_mapping(args: any): any;
    function update_upload_preset(args: any): any;
    function upload_mapping(args: any): any;
    function upload_mappings(args: any): any;
    function upload_preset(args: any): any;
    function upload_presets(args: any): any;
    function usage(args: any): any;
  }
  function cloudinary_js_config(): any;
  function config(new_config: any, new_value: any): any;
  function image(source: any, options: any): any;
  function picture(public_id: any, options: any): any;
  class search {
    static aggregate(value: any): any;
    static expression(value: any): any;
    static instance(): any;
    static max_results(value: any): any;
    static next_cursor(value: any): any;
    static sort_by(field_name: any, dir: any): any;
    static with_field(value: any): any;
    query_hash: any;
    aggregate(value: any): any;
    execute(options: any, callback: any): any;
    expression(value: any): any;
    max_results(value: any): any;
    next_cursor(value: any): any;
    sort_by(field_name: any, dir: any): any;
    to_query(): any;
    with_field(value: any): any;
  }
  function source(public_id: any, options: any): any;
  namespace uploader {
    function add_context(args: any): any;
    function add_tag(args: any): any;
    function create_archive(args: any): any;
    function create_zip(args: any): any;
    function destroy(args: any): any;
    function direct_upload(callback_url: any, options: any): any;
    function explicit(args: any): any;
    function explode(args: any): any;
    function generate_sprite(args: any): any;
    function image_upload_tag(field: any, options: any): any;
    function multi(args: any): any;
    function remove_all_context(args: any): any;
    function remove_all_tags(args: any): any;
    function remove_tag(args: any): any;
    function rename(args: any): any;
    function replace_tag(args: any): any;
    function text(args: any): any;
    function unsigned_image_upload_tag(
      field: any,
      upload_preset: any,
      options: any
    ): any;
    function unsigned_upload(args: any): any;
    function unsigned_upload_stream(args: any): any;
    function upload(args: any): any;
    function upload_chunked(args: any): any;
    function upload_chunked_stream(args: any): any;
    function upload_large(args: any): any;
    function upload_large_part(args: any): any;
    function upload_stream(args: any): any;
    function upload_tag_params(options: any): any;
    function upload_url(options: any): any;
  }
  function url(public_id: any, options: any): any;
  namespace utils {
    const AKAMAI_SHARED_CDN: string;
    const CF_SHARED_CDN: string;
    const DEFAULT_POSTER_OPTIONS: {
      format: string;
      resource_type: string;
    };
    const DEFAULT_VIDEO_SOURCE_TYPES: string[];
    function NOP(): void;
    const OLD_AKAMAI_SHARED_CDN: string;
    const SHARED_CDN: string;
    const USER_AGENT: string;
    const VERSION: string;
    function api_sign_request(params_to_sign: any, api_secret: any): any;
    function api_url(action: any, options: any): any;
    function archive_params(options: any): any;
    function as_safe_bool(value: any): any;
    function at(...args: any[]): any;
    function build_array(arg: any): any;
    function build_custom_headers(headers: any): any;
    function build_eager(transformations: any): any;
    function build_explicit_api_params(public_id: any, options: any): any;
    function build_streaming_profiles_param(options: any): any;
    function build_upload_params(options: any): any;
    function clear_blank(hash: any): any;
    function clone(value: any): any;
    function cloudinary_js_config(): any;
    function download_archive_url(options: any): any;
    function download_zip_url(options: any): any;
    function encode_context(arg: any): any;
    function encode_double_array(array: any): any;
    function encode_key_value(arg: any): any;
    function ensurePresenceOf(parameters: any): void;
    function extend(...args: any[]): any;
    function extractTransformationParams(options: any): any;
    function extractUrlParams(options: any): any;
    function filter(collection: any, predicate: any): any;
    function generate_auth_token(options: any): any;
    function generate_responsive_breakpoints_string(breakpoints: any): any;
    function generate_transformation_string(options: any): any;
    function getUserAgent(): any;
    function html_attrs(attrs: any): any;
    function includes(
      collection: any,
      value: any,
      fromIndex: any,
      guard: any
    ): any;
    function isArray(p0: any): any;
    function isEmpty(value: any): any;
    function isNumber(value: any): any;
    function isObject(value: any): any;
    function isString(value: any): any;
    function isUndefined(value: any): any;
    function jsonArrayParam(data: any, modifier: any): any;
    function keys(object: any): any;
    function merge(hash1: any, hash2: any): any;
    function only(source: any, keys: any): any;
    function option_consume(
      options: any,
      option_name: any,
      default_value: any
    ): any;
    function patchFetchFormat(options: any): void;
    function present(value: any): any;
    function private_download_url(
      public_id: any,
      format: any,
      options: any
    ): any;
    function process_request_params(params: any, options: any): any;
    function random_public_id(): any;
    function sign_request(params: any, options: any): any;
    function signed_preloaded_image(result: any): any;
    function timestamp(): any;
    function updateable_resource_params(options: any, params: any): any;
    function url(public_id: any, options: any): any;
    const userPlatform: string;
    function v1_adapters(exports: any, v1: any, mapping: any): any;
    function video_thumbnail_url(public_id: any, options: any): any;
    function video_url(public_id: any, options: any): any;
    function webhook_signature(data: any, timestamp: any, options: any): any;
    function zip_download_url(tag: any, options: any): any;
  }
  function video(public_id: any, options: any): any;
}
export function video(public_id: any, options: any): any;
