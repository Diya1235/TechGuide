
import mongoose from "mongoose";

const WebsiteStatSchema = new mongoose.Schema({
    visits: { type: Number, default: 0 }, // Total visit count
    totalTimeSpent: { type: Number, default: 0 }, // Time spent in seconds
    uniqueVisitors: { type: Number, default: 0 }, // Unique visitors count
    lastUpdated: { type: Date, default: Date.now }, // Last update timestamp
});

export const WebsiteStat = mongoose.model("WebsiteStat", WebsiteStatSchema);
