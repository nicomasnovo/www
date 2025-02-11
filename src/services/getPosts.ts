import postsList from '@/data/posts-list.json'

export interface Post {
  title: string
  date: string
  tags?: string[]
  link: string
  content?: string
  image?: string
}

export async function getPosts(): Promise<Post[]> {
  try {
    return postsList.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}
