interface image{
    asset_id: String,
    public_id: String,
    version: String,
    version_id: String,
    signature: String,
    width:Number,
    height:Number,
    format:String,
    resourcetype:String,
    createdAt:String,
    tags: [],
    bytes:Number,
    type:String,
    etag: String,
    placeholder: boolean,
    url: String,
    secure_url: String,
    original_filename: String,
}
export default image;