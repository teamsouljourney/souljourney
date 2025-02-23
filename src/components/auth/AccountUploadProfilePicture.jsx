import avatar from "../../assets/avatar.png"

const AccountUploadProfilePicture = ({userInfo}) => {
  return (
    <>
        <div className="flex w-full flex-col items-start gap-4">
                    <span className="text-2xl font-medium">
                      <i>
                        {userInfo.firstName} {userInfo.lastName}
                      </i>
                    </span>
                    <div className="flex items-center gap-4">
                      <img
                        className="h-16 w-16 rounded-full border-1 border-navy object-cover "
                        src={userInfo.image || avatar}
                      />
                      {/* Upload Profile Image Section */}
                      <div className="flex flex-col items-start gap-2">
                        <button type="button" className="account-btn">
                          Upload
                        </button>
                        <span>
                          For best results, upload an image 512x512 or larger.
                        </span>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default AccountUploadProfilePicture