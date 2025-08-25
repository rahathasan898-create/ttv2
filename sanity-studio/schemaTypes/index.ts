// schemaTypes/index.ts
// Last updated: 22 August 2025, 01:29 AM (AEST)

// Document types
import post from './post'
import author from './author'
import course from './course'
import lesson from './lesson'
import resource from './resource'
import page from './page'
import topic from './topic' // New
import platform from './platform' // New

// Object types
import blockContent from './blockContent'
import youtubeEmbed from './youtubeEmbed'
import tiktokEmbed from './tiktokEmbed'
import instagramEmbed from './instagramEmbed'
import cloudEmbed from './cloudEmbed'
import proTip from './proTip'
import keyTakeaways from './keyTakeaways'
import toolRecommendation from './toolRecommendation'
import cta from './cta'
import socialLink from './socialLink'
import advertisement from './advertisement'
import resourceEmbed from './resourceEmbed'
import postEmbed from './postEmbed'
import downloadableFile from './downloadableFile'
import promoSection from './promoSection'
import testimonialSection from './testimonialSection'
import logoCloud from './logoCloud'
import textBlock from './textBlock'
import logo from './logo'
import seo from './seo'
import contentMetrics from './contentMetrics'
import monetization from './monetization'
import taxonomy from './taxonomy' // New

export const schemaTypes = [
  // Document types
  post,
  author,
  course,
  lesson,
  resource,
  page,
  topic, // Add new schema
  platform, // Add new schema

  // Object types
  blockContent,
  youtubeEmbed,
  tiktokEmbed,
  instagramEmbed,
  cloudEmbed,
  proTip,
  keyTakeaways,
  toolRecommendation,
  cta,
  socialLink,
  advertisement,
  resourceEmbed,
  postEmbed,
  downloadableFile,
  promoSection,
  testimonialSection,
  logoCloud,
  textBlock,
  logo,
  seo,
  contentMetrics,
  monetization,
  taxonomy, // Add the new schema to the list
]
