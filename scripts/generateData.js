import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

async function downloadImage(url, filepath) {
  if (!url) return ''

  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      )

    const fileStream = fs.createWriteStream(filepath)
    await finished(Readable.fromWeb(response.body).pipe(fileStream))

    return filepath
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error)
    return ''
  }
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

async function fetchPosts() {
  try {
    const username = 'nicomasnovo'
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('No posts found or invalid response format')
    }

    // Ensure directories exist
    const dataDir = './src/data'
    const imagesDir = './src/assets/posts'
    await ensureDir(dataDir)
    await ensureDir(imagesDir)

    let filesList = []

    for (const post of data.items) {
      // Extract image from content
      const imageMatch = post.description.match(/<img[^>]+src="([^">]+)"/)
      const imageUrl = imageMatch ? imageMatch[1] : post.thumbnail || ''

      // Clean HTML content using regex
      const cleanContent = post.description
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace HTML entities
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()

      // Clean up the Medium link by removing RSS source parameter
      const cleanLink = () => {
        const originalLink = post.link.replace(/\?source=rss-.*$/, '')
        return originalLink.replace(
          'medium.com/@nicomasnovo',
          'blog.nicomasnovo.com'
        )
      }

      const slug = cleanLink().split('/').pop()

      // Download and save image if available
      let imagePath = ''
      if (imageUrl) {
        const imageExtension = path.extname(imageUrl) || '.jpg'
        const imageFilename = `${slug}${imageExtension}`
        const imageFilepath = path.join(imagesDir, imageFilename)
        imagePath = await downloadImage(imageUrl, imageFilepath)
        if (imagePath) {
          imagePath = `/posts/images/${imageFilename}` // Convert to relative URL path
        }
      }

      const postData = {
        title: post.title,
        date: new Date(post.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        tags: post.categories || [],
        link: cleanLink(),
        content: cleanContent.slice(0, 150) + '...',
        image: imagePath
      }

      filesList.push(postData)
    }

    // Sort posts by date (newest first)
    filesList.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Save posts list JSON
    fs.writeFileSync(
      path.join(dataDir, 'posts-list.json'),
      JSON.stringify(filesList, null, 2)
    )

    console.log('Successfully created JSON file and downloaded images')
  } catch (error) {
    console.error('Error in script:', error)
    process.exit(1)
  }
}

fetchPosts()
