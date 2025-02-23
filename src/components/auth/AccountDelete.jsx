import React from 'react'

const AccountDelete = () => {
  return (
    <>
        <div className="w-full p-4 border-2 border-red-200 bg-red-50 dark:bg-red-900/50 dark:border-red-900/30 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold text-red-700 dark:text-red-400">
                Delete account
              </h4>
              <p className="text-sm text-red-600/90 dark:text-red-300/90">
                Permanently remove your account and all of your content. This
                action is not reversible.
              </p>
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-md hover:bg-red-200 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                onClick={() => {
                  //? Modal for delete?
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    //? Delete?
                    console.log("Account deletion triggered");
                  }
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default AccountDelete