import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { UserPostList } from "./posts/UserPostsList"
import { AllPostList } from "./posts/AllPostList"
import { PostDetail } from "./posts/PostDetail"
import { CategoryContext, CategoryProvider } from "./categories/CategoryProvider"
import { CategoryList } from "./categories/CategoryList"
import { CategoryForm} from "./categories/CategoryForm"
import { PostForm } from "./posts/PostForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
            <PostProvider>
                <CategoryProvider>

                <Route exact path="/posts" render={(props) => <UserPostList {...props} />}/>
                <Route exact path="/allposts" render={(props) => <AllPostList {...props}/>}/>
                <Route 
                path="/posts/:postId(\d+)"
                render={(props) => <PostDetail {...props}/>}/>
                <Route
                    path="/posts/edit/:postId(\d+)"
                    render={(props) =><PostForm {...props}/>}/>
                <Route
                    path="/posts/create"
                    render={(props) =><PostForm {...props}/>}
                    />
                    </CategoryProvider>
                    </PostProvider>
            <CategoryProvider>
                <Route exact path="/categories" render={(props) => <CategoryList {...props} />}/>
                <Route exact path="/categories/create" render={
                            props => <CategoryForm {...props} />
                        } />
                        <Route path="/categories/edit/:categoryId(\d+)" render={
                            props => <CategoryForm {...props} />
                        } />
            </CategoryProvider>

        </main>
    </>
}
