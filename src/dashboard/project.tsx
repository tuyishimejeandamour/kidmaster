import React from 'react'
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

interface projectProps {
    name: string;
    image: string;
    color: string;
}

interface Props {
    project: projectProps
}

const title = {
    initial: { y: -20, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};

const robot = {
    initial: { y: -20, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};

export default function Project(props:Props) {
    const router = useNavigate();
    return (
        <div
            className="inner-container mb-[-1px] ml-[-1px] relative border lg:border-t-transparent border-b-transparent border-blue-50/10 ">
            <div className="Card_container__rgpnr relative">
                <a href="#">
                    <div className="relative w-full pb-[50%] md:pb-[65%]">
                        <div className="p-6 absolute inset-0">
                            <div
                                className="w-full h-full flex items-center justify-center overflow-hidden relative cursor-pointer rounded-xl card-contain">
                                <motion.div
                                    variants={title}
                                    className="font-mono text-3xl md:text-4xl uppercase text-white font-bold z-10"> Proxy
                                    Keys
                                </motion.div>
                                <div
                                    className="encryption absolute top-0 left-0 h-full w-full overflow-hidden text-xs text-gray-400 leading-5 font-mono break-words"> GIHXTrTBRIPocF8gMJPAM5dyuwCO7DIqMlrx45EFKa8Ky06RHwDafK1CpxdOLAI6mM8YX4iHsZ188j00gNkbgDYEtrq1S5vaOIxHhALKib3EKVD5tuYf3Ej2QA0R363viNI0tP8RVD4GlLzNPHpBkePL76KLzZrXa6x88wsJN8sslwiKTxEeepv1760YPcdyrfnqv4W4RRv2Fw9f6rBIgzOaBF5Jet4rjo2eIuKCUDkM9t8ZnfvGCzguyoFkTlmLtQuzQKPZLVuPtpbbBOdrUG795uSVFCnFjnJKgHGAiAeGZmu0n1lnfNgOB9t7cLc7Gk7jUfW3aHK3es56mORlQyACrHBDVQjPiBaIbfBBAreNiZAo8NzadXQ28HOHTvdL90GYoqJC9fqitNn0R1CWVJyEqCCKlTZSU2UFhgUNCI7Zzozl7QlZceSE5SrXNjtBnAi0sMiIeJb43o2x2vHQehvUmTaejG3UqETeRxzvg4qhD1qFDkk8y3mwuq31NWDlaszIhhVNnu6NTapPGT9XKXDCMee8QOGnQuBsPEQHCNs3eX3jsZLitOCTTVljHuY8A3AEAiWudJduue5X5PTFSc1UfFt8U1Yhj4qiVQaip3XkfesyBnk7wVaAWUKrKMToGVSyeoD23U1CNibAimwV7TKRpWWGSvXdFclFM6XuigtHlZzSLOE40wY3eEw4rAPeZF30jJMZytpXVc9AsprMpCfoKMbKSPUnDuXCq1nhggY2MTkCdcGkABxsbolIuyYUZMu2Lqt18aNIN1ZudI08ZVJHCX8q2XcPv43nDtjeHE8djSxcxoXb2b0vw4Wc4AuO2Uph0K6fYSXt54nRHit19TkgCi8dhY2PZAfyiULAvmQy6CQYc5Xw8yfSVMtHnNs2kuC1e376penaAMQ1jUozKWJneHjF21aleJWjN2NJ8bMNyfTNIL1ijpGwz6urHGrSyYR94ghvxNxBwZgRJZbx5IVqjwqDxnzAacMBvViVG4UHluE4UaoLPCHkHBrYj6m32mAIjkso2tC3kBu5XmGnAVdz8UzkPzxgtORxHPEisInmi7fgLGywdQ8Zz3Zdh9912kMR9b6MQ3xRFrlZo5gOQYhSSgyH1gIyGAjjcO3O3EptA7CcRsIeaNR5O3NG4iABwLfN1ebEBC6fLMzIDLlSYs8zQwHYsdSZMbb5yoYxvfB7G4rmEQA9FJ2o1kLzk1OTAk4vUKIEt8gfSDxzgROhMjqDoIeLiWgbXLefVRNVDf0mldlPY7oinEnos1JuxfpukoDhQL5aP2e8pqvhnctNHEGyNDtL3nea1JtDOlBic0OriZlTvIRCADyDFWE7otCHnFipuCFMViCR30HM0pzuCAeQdtvChyIe3mXBxIQnbAqgbLQXhhOD79Nyf8wlyT3fWvufGlgJO4jKD0iwerKMeXGQ0lIClU2fsEGfYAno4b2xeDD1mUO78hXABPREdtj38GoIZCNpxN69TLnCqLDG0pIkXxyYDaMmU9C5YnUr81n1xOgVyeH4iJvMF7CQkuYgWAsvwSwcNtIDtU2vjzXORp4VDlRjXDu4SqGbCDvijjn4wCJLJE1mLvv9R5mMOjHDBVdEOjoJuMp7YpVqSIWenC3oLGsJPJl5KarsVxaMnSWTHRw8wDVHNOcXXO9ZGGQGdi31ikeIfZABoUBKmeyBbgepVlCkDy3aytzYiwmX7fosxj1vk6qbji9GbVNEhimXHZR2rFuKBpov1nahPbopBpfaGKY15UoN2pQOtV5oG1MngCxTTqNBu8khxbYDbRDilYYwbiWk
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <motion.div variants={robot} className="p-6">
                    <div className="text-sm mb-3.5 text-white"> Proxy API requests without ever
                        having to store or exchange real API keys in your codebase.
                    </div>
                    <div
                        onClick={() => {router(`/${props.project.name}`)}}
                        className="text-sm group text-blue-300 border border-blue-600/90 font-medium inline-flex px-3 py-3 rounded-full hover:bg-blue-600/50 hover:[>text-white] hover:cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-4 text-blue-600 h-4 group-hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                        </svg>

                    </div>
                </motion.div>
            </div>
            <span
                className="main-section bottom-l absolute w-[1px] h-[1px] bottom-[-1px] left-[-1px]"></span><span
            className="main-section bottom-l absolute w-[1px] h-[1px] bottom-[-1px] right-[-1px]"></span><span
            className="main-section bottom-l absolute w-[1px] h-[1px] top-[-1px] right-[-1px]"></span><span
               className="main-section bottom-l absolute w-[1px] h-[1px] top-[-1px] left-[-1px]"></span>
        </div>
    )
}
