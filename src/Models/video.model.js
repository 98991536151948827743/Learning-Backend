import mongoose, {Schema} from "mongoose";
import agrregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    },
    
    videofile: {
    type: String,
    required: true,
    },

    thumbnail: {
    type: String,
    required: true,
    },

    ispublished: {
    type: Boolean,
    default: false,
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

    viewCount: {
    type: Number,
    default: 0,
    },

    duration: {
    type: Number,
    required: true,
    }, 

} ,{Timestamp: true});


videoSchema.plugin(agrregatePaginate);

const Video = mongoose.model("Video", videoSchema);
export default Video;