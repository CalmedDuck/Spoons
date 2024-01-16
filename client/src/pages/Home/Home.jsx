import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { RANDOM_RECIPES_QUERY, CHAT_WITH_BOT_QUERY } from '../../graphql/queries';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/

function Home() {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(RANDOM_RECIPES_QUERY);

    // Chatbot state
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [contextId, setContextId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [chatbotError, setChatbotError] = useState('');

    const [getChatResponse, { data: chatData, loading: chatLoading, error: chatQueryError }] = useLazyQuery(CHAT_WITH_BOT_QUERY);

    useEffect(() => {
        if (data && data.randomRecipes) {
            setFeaturedRecipes(data.randomRecipes);
        }
    }, [data]);

    useEffect(() => {
        if (chatData && chatData.chatWithBot) {
            const { answerText, newContextId } = chatData.chatWithBot;
            setChatHistory(prevHistory => [...prevHistory, { question: userInput, answer: answerText }]);
            setContextId(newContextId);
        }

        if (chatQueryError) {
            setChatbotError('Error communicating with the chatbot.');
        }
    }, [chatData, chatQueryError]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        getChatResponse({ variables: { userInput, contextId } });
    };

    useEffect(() => {
        if (!chatLoading && !chatQueryError) {
            setIsSubmitting(false);
            setUserInput(''); // Clear input after submission
        }
    }, [chatLoading, chatQueryError]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="home-page">
            <div className="content-container">
                {/* Featured Recipes Section */}
                <section className="featured-recipes-section">
                    <h2>Featured Recipes</h2>
                    <div className="featured-recipes-carousel">
                        {featuredRecipes.length > 0 ? (
                            <Slider {...settings}>
                                {featuredRecipes.map((recipe) => (
                                    <div key={recipe.id} className="featured-recipe" onClick={() => handleRecipeClick(recipe.id)}>
                                        <img src={recipe.image} alt={recipe.title} style={{ cursor: 'pointer' }} />
                                        <h3>{recipe.title}</h3>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No featured recipes to display</p>
                        )}
                    </div>
                </section>

                {/* Chatbot Section */}
                <section className="chatbot-section">
                    <h2>Talk to our Food Chatbot</h2>
                    <form onSubmit={handleSubmit} className="chatbot-form">
                        <input 
                            type="text" 
                            value={userInput} 
                            onChange={handleInputChange} 
                            placeholder="Ask the chatbot..." 
                            disabled={isSubmitting}
                        />
                        <button type="submit" disabled={isSubmitting}>Send</button>
                    </form>
                    {chatbotError && <p className="chatbot-error">Error: {chatbotError}</p>}
                    <div className="chatbot-conversation">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className="chat-message">
                                <p className="user-question"><strong>You:</strong> {chat.question}</p>
                                <p className="bot-answer"><strong>Bot:</strong> {chat.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ... other sections if any ... */}
        </div>
    );
}

export default Home;
