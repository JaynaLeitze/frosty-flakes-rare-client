import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import {HumanDate} from "../utils/HumanDate"

export const AllPost = ({post, props}) =>{
    // when user provider is provided, if statement will need to be altered to user.id = localstorage.getItem(rare_user_id)
    if(!post){
        post = {}
    }
        return(
            
            <div className="posts">
               {/* <div>userid: {post.user_id}</div>
                <div>category_id: {post.category_id}</div> */}
                <Link to={{
                    pathname: `/posts/${post.id}`,
                    state: { chosenPost: post }
                }}>
                    title: {post.title}</Link>
                {/* <div>publication_date: {<HumanDate date={Date(post.publication_date)} />}</div>
                <div>image_url: {post.image_url}</div>
                <div>content: {post.content}</div> */}
                <div>category: {post.category.label}</div>
                <div>author: {post.user.user.first_name} {post.user.user.last_name} </div>
            </div>
        )
}