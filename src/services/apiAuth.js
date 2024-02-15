import supabase, { supabaseUrl } from "./supabase"

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) throw new Error(error.message)
    return data
}

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

export async function logout() {
    const { error } = await supabase.auth.signOut()
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update the password or the fullname
    let updateData;
    if (password) updateData = { password }
    if (fullName) updateData = { data: { fullName } }

    const { data, error } = await supabase.auth.updateUser(updateData)

    if (error) throw new Error(error.message)
    if (!avatar) return data

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`
    const { error: storageError } = supabase.storage.from("avatars").upload(fileName, avatar)
    if (storageError) throw new Error(storageError.message)

    // 3. Update avatar in the user
    const { data: updatedUser, error: errorUpdate } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })

    if (errorUpdate) throw new Error(errorUpdate.message)
    return updatedUser
}