import React from "react";

//include images into your bundle

import { ChatBot } from "./chatbot.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ChatBot />
		</div>
	);
};

export default Home;
