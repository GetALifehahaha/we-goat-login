import webgoat from '../../../assets/images/image.png'
import hashing from '../../../assets/images/hashing.png'
import login_error from '../../../assets/images/login_error.png'
import login_validate from '../../../assets/images/login_validate.png'
import password_validate from '../../../assets/images/password_validate.png'

const BlogPage = () => {
    const authors = [
        "Lutian, E. D. S.",
        "Sahid, A. M.",
        "Sencio, A. J.",
        "Toong, J. A."
    ]

    return (
        <div className='w-full min-h-full'>
            <div className='w-full h-64 md:h-80 bg-mauve-600 rounded-2xl relative mb-32'>
                <div className='absolute min-w-[80%] md:min-w-1/3 w-fit p-6 md:p-20 h-auto md:h-20 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-3xl md:rounded-4xl bg-neutral-950 border border-white/10
                    flex flex-col justify-center items-center text-center
                '>
                    <h1 className='text-white font-semibold tracking-tight text-2xl md:text-4xl'>
                        Authentication
                    </h1>
                    <h5 className='text-mauve-200/50 tracking-wide text-sm md:text-base mt-2 md:mt-0'>
                        Complexity beneath Simplicity
                    </h5>
                </div>
            </div>

            {/* Authors and Time Information */}
            <div className='py-4 border-y border-white/20 text-white flex flex-col gap-2'>
                <h2 className='text-white/80'>
                    We-Goat Group
                </h2>
                <div className='flex flex-wrap items-center gap-4 p-1.5 border border-white/10 rounded-2xl'>
                    <h5 className=''>Authors: </h5>
                    {
                        authors.map((name, index) =>
                            <h5
                                key={index}
                                className='font-semibold'
                            >
                                {name}
                            </h5>
                        )
                    }
                </div>
                <div className='flex flex-wrap gap-4 items-center text-sm tracking-wide text-white/50'>
                    <h5>
                        Western Mindanao State University
                    </h5>
                    <h5>
                        Bachelor of Science in Information Technology
                    </h5>
                    <h5>3-A</h5>
                </div>
            </div>

            {/* Part 1 */}
            <div className='mt-24 md:mt-40 flex flex-col gap-8 md:gap-16 w-[90%] md:w-3/4 mx-auto text-center'>
                <h2 className='text-white text-3xl md:text-6xl'>
                    "Authentication is easy to implement badly. And small mistakes is all it needs to break in."
                </h2>

                <h2 className='text-white text-lg md:text-2xl'>
                    The cybersecurity-basics website, the OWASP WebGoat, demonstrates that weak authentication logic often comes from assumptions and weak logic security.
                </h2>

                <h5 className='text-neutral-300 text-lg md:text-2xl'>
                    This includes trusting client-side input validation (e.g., hidden fields, cookies, parameters, URL, or even the request itself), using predictable and poorly enforced validated credentials that are not on par with the current standards, and failing to enforce proper session management.
                </h5>
            </div>

            {/* Part 2 */}
            <div className='text-white flex flex-col gap-8 md:gap-16 mx-auto md:ml-auto w-[90%] md:w-2/3 mt-24 md:mt-40 border-y-2 border-white/20 py-10 md:py-16'>
                <h2 className='text-2xl md:text-4xl font-semibold'>
                    For example, in the activities provided in the WebGoat, we will learn that:
                </h2>

                <ol className="flex flex-col gap-4 pl-4 md:pl-0">
                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        Login checks can be bypassed by manipulating request parameters using an interceptor.
                    </li>

                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        It also shows that authentication decisions should never rely on the frontend.
                    </li>

                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        Sessions can be hijacked if tokens are predictable or not invalidated properly
                    </li>
                </ol>
            </div>

            {/* Part 3 */}

            <div className='text-white flex flex-col gap-8 md:gap-16 mx-auto md:ml-auto w-[90%] md:w-2/3 border-y-2 border-white/20 py-10 md:py-16'>
                <h2 className='text-2xl md:text-4xl font-semibold'>
                    Then, what happens when security is compromised?
                </h2>

                <ol className="flex flex-col gap-4 pl-4 md:pl-0">
                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        Attackers log in as legitimate users. They can change passwords, update email addresses, and permanently lock the real users out of their own accounts.
                    </li>

                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        If an attacker compromises a standard user account, they will try to find vulnerabilities to escalate their permissions to an "Admin" or "Superuser" role. If an admin account is compromised directly, the attacker essentially owns the entire system.
                    </li>

                    <li className='list-decimal text-neutral-300 text-base md:text-lg'>
                        Once inside, attackers will scrape databases for Personally Identifiable Information (PII), financial records, or proprietary business data.
                    </li>
                </ol>
            </div>

            {/* Part 4 */}
            <div className='text-white flex flex-col gap-8 md:gap-16 mx-auto md:ml-auto w-[90%] md:w-2/3 border-y-2 border-white/20 py-10 md:py-16'>
                <h2 className='text-2xl md:text-4xl font-semibold'>
                    So, what can we do?
                </h2>

                <p>There are numerous ways to create a secure authentication point and prevent attackers from illegitimately entering your website.</p>

            </div>

            {/* Part 5: Ways to Prevent Attacks */}
            <div className='flex flex-col gap-16 my-8 text-white w-full md:w-[80vw] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-center text-xl'>One such way is by learning basic security fundamentals thru <strong>WebGoat</strong></h4>
                    <img src={webgoat} className='rounded-2xl border-white/20 border' />
                    <p>Learn how attackers force through security measures. We will be able to simulate attacks, such as SQL injections, interceptors, and scripting. As such, we will be able to implement security measures that will make our applications more secure.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='text-center text-xl'>Another thing to do is how we handle passwords in our databases</h4>
                    <p>Hashing passwords is one way to do it. Most ORM and backend framework, such as Django for this instance, uses a hashing algorithm to store passwords. <strong>Hashing </strong> is a security function that transforms a string of text into a jumbled mess of characters where the original text cannot be retrieved back thru the same function..</p>
                    <img src={hashing} className='rounded-2xl border-white/20 border' />
                    <p>The only way to get access into an account is by using the same hash function to an input password and compare it to the hashed password stored in the database. If it matches, you will gain access to your account. Similarly, backend frameworks commonly has an input sanitization that prevents SQL injection and other malicious inputs.</p>
                </div>

                <div className='flex flex-col gap-8'>
                    <h4 className='text-center text-2xl font-bold'>Authentication should neither be generous nor considerate.</h4>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h5>Be <strong>vague</strong> about user credentials when logging in. Rather then telling the user that the username is wrong or the password is wrong, tell the user that both doesn't match. This keeps guessing for accounts, which serves as a basic authentication security.</h5>
                            <img src={login_error} className='rounded-2xl border-white/20 border' />
                        </div>
                        <div>
                            <h5>Prevent users from registering with a <strong>weak password</strong>. This will help prevent bruteforce attacks from attackers at the cost of user experience/conveniece. Django has a built-in password validations, such as preventing common passwords, numeric ones, similar with username, and minimum length. We added a few new validations which requires 1 special character, 1 small character, and 1 capital character.</h5>
                            <img src={password_validate} className='rounded-2xl border-white/20 border' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-24 md:mt-40 p-6 md:p-8 py-12 md:py-16 rounded-2xl bg-white flex flex-col gap-8 md:gap-16 relative w-[95%] md:w-full mx-auto'>
                <div className='absolute top-4 right-4 w-4 h-4 rounded-full bg-red-600 animate-pulse' />
                <h2 className='text-2xl md:text-4xl font-semibold'>Authentication should be handled on the back end side, while the front end should handle only UI and feedbacks.</h2>

                <h5 className='w-full md:w-2/3 ml-auto text-left md:text-right text-lg md:text-xl'>
                    The server should always enforce strict, validated inputs and requests from the frontend, secure password handling (e.g., hashing, salting), a strong session/token management, and a zero-trust model where the back end should not rely or trust on the inputs from the front end.
                </h5>
            </div>

            {/* Quote */}
            <h1 className='text-mauve-500 my-24 md:my-40 text-4xl md:text-8xl font-semibold text-center tracking-tight px-4'>
                Never trust. <strong className='text-white block md:inline'>Always verify.</strong> <strong className='text-red-400 block md:inline'>Security fails where trust is misplaced.</strong>
            </h1>

            {/* Footer */}
            <div className="w-full p-6 md:p-8 border-t border-slate-100 py-16 md:py-24">
                <h5 className='text-sm md:text-md text-mauve-400'>Prepared by:</h5>

                <div className='text-lg md:text-2xl font-semibold text-mauve-200 tracking-tight mt-8 md:mt-18'>
                    <h5>Lutian, Erzhad Dominic S.</h5>
                    <h5>Sahid, Aldrian M.</h5>
                    <h5>Sencio, Ahlan-nour J.</h5>
                    <h5>Toong, Justine A.</h5>
                </div>

                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mt-6 md:mt-4 text-sm md:text-base text-mauve-400">
                    <h5>Bachelor of Science in Information Technology</h5>
                    <span className="hidden md:block">|</span>
                    <h5>A Website Final Project in Information Assurance and Security</h5>
                </div>
            </div>
        </div>
    )
}

export default BlogPage