import React from "react"
import {Typography} from "@mui/material";


export default function PageNotFound () {
    return (
        <>
        <div className="min-h-dvh flex flex-col items-center p-8 sm:p-16 rounded-lg sm:w-4/5 h-auto sm:h-[400px] text-center">
           <Typography
            sx={{
            marginTop: 10,
            fontWeight: 500,
            fontSize: '2rem',
            }}
            component="h1"
            type="h4"
            >
            Error - Page Not Found (HTTP-404)
            </Typography>

        </div>
        </>
    );
}