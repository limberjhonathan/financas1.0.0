export function FormLayout({ children }: { children: React.ReactNode }) {
    return(
        <form className="
        flex 
        flex-col 
        gap-3 
        mt-4 
        w-[350px]
        2xl:gap-5 
        2xl:w-[400px]   
        ">
            {children}
        </form>
    )
}