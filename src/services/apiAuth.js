import supabase from "./supabase"

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) throw new Error(error.message)
    return data
}

export async function getCurrentUser() {
    // Get the data directly from the local storage
    const { data: session } = await supabase.auth.getSession()
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)
    return data?.user
}