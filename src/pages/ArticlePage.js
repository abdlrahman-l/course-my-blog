import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import axios from 'axios'
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    const { canUpvote } = articleInfo
    const { articleId } = useParams();

    const article = articles.find(article => article.name === articleId);

    const { user, isLoading } = useUser()

    const addUpvote = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? { authToken: token } : {}
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {
            headers
        })
        const newArticleInfo = response.data
        setArticleInfo(newArticleInfo)
    }

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken()
            const headers = token ? { authToken: token } : {}
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers
            })
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo)
        }

        if (!isLoading) {
            loadArticleInfo()
        }

    }, [isLoading, user])

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
            <h1>{article.title}</h1>
            {
                user 
                ? <button onClick={addUpvote}>{ canUpvote ? 'Upvote' : 'already upvote' }</button>
                : <button>Log in to upvote</button>
            }
            <p>This article has {articleInfo.upvotes} upvotes</p>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {
                user
                ? 
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={setArticleInfo}
                />
                : <button>Log in to add a comment</button>
            }
            <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;