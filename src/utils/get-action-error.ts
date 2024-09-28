
export const getActionError = (error: any): string => {
    let message = "";

    if (error instanceof Error) {
        // Aquí sabemos que `error` es una instancia de Error
        message = error.message;
    } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
    )
        message = (error as { message: string }).message;
    else message = `Ocurrió algún error: ${error}`;

    //console.error(message);
    return message;
};
