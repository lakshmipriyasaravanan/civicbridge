import mongoose from 'mongoose';
const schemeSchema=new mongoose.Schema({name:{type:String,required:true},category:String,department:String,level:String,state:String,benefit:String,description:String,targetAudience:[String],eligibility:{minAge:Number,maxAge:Number,education:[String],maxIncome:Number,locations:[String]},documents:[String],applicationSteps:[String],tags:[String],demoMatch:Number,eligibilityPreview:[String]},{timestamps:true});
export default mongoose.model('Scheme',schemeSchema);
