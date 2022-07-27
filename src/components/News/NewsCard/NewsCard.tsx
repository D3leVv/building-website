import React from "react";
import { News } from "../../../Types/News";

function NewsCard(props: News) {
    return (
        <div
            key={props.title}
            className="flex flex-col w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
        >
            <div className="flex-shrink-0">
                <img
                    className="object-cover w-full h-48"
                    src={props.image}
                    alt={props.category}
                />
            </div>
            <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                        <a href={props.category} className="hover:underline">
                            {props.category}
                        </a>
                    </p>
                    <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                            {props.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">
                            {props.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <div className="flex-shrink-0">
                        <a href={props.author}>
                            <span className="sr-only">{props.author}</span>
                            {/* <img className="w-10 h-10 rounded-full" src={props.author.imageUrl} alt="" /> */}
                        </a>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Author:{" "}
                            <span className="font-bold">{props.author}</span>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            {/* <time dateTime={props.datetime}>{props.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{props.readingTime} read</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
