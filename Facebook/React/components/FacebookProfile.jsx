
export default function FacebookProfile() {
  return (
    <>
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Search</h3>
            <div style={{ padding: "8px" }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "3px",
                  border: "1px solid #bbb"
                }}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h3>My Profile</h3>
            <ul>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Edit Profile</a></li>
              <li><a href="#">My Photos</a></li>
              <li><a href="#">My Videos</a></li>
              <li><a href="#">My Events</a></li>
              <li><a href="#">My Groups <span className="count">(13)</span></a></li>
              <li><a href="#">My Notes</a></li>
              <li><a href="#">My Account</a></li>
              <li><a href="#">My Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="profile-box">
            <div className="profile-top">
              <div className="profile-pic">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt="Profile"
                />
              </div>

              <div className="profile-info">
                <h1>
                  Mark <br /> Zuckerberg
                </h1>

                <div className="meta">
                  <strong>Harvard</strong><br />
                  San Francisco, CA<br /><br />
                  Sex:<br />
                  Birthday:<br />
                  Hometown:<br />
                  Relationship Status:<br />
                  Looking For:<br />
                  Political Views:<br />
                  Interests:
                </div>

                <div
                  className="meta"
                  style={{ marginLeft: "120px", marginTop: "-142px" }}
                >
                  <br /><br /><br />
                  Male<br />
                  May 14, 1984<br />
                  Dobbs Ferry, NY<br />
                  In a Relationship<br />
                  Random Play, Friendship<br />
                  Very Liberal<br />
                  See All
                </div>

                <div className="profile-actions">
                  <a href="#">Send Mark a Message</a>
                  <a href="#">Poke Mark</a>
                  <a href="#">Write on Mark&apos;s Wall</a>
                </div>
              </div>
            </div>
          </div>

          {/* Wall */}
          <div className="profile-box">
            <h2 className="section-title">The Wall</h2>

            <div className="status-update">
              <strong>Post a message on Mark&apos;s Wall</strong>
              <textarea placeholder="Write something..." />
              <button>Share</button>
            </div>

            <WallPost
              name="Priscilla Chan"
              time="2 hours ago"
              text="Had an amazing time at the charity gala tonight! ❤️"
              img="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            />

            <WallPost
              name="Dustin Moskovitz"
              time="5 hours ago"
              text="Great meeting today! The potential is incredible."
              img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function WallPost({ name, time, text, img }) {
  return (
    <div className="wall-post">
      <div className="wall-post-header">
        <img src={img} alt={name} />
        <a href="#">{name}</a>
        <span className="wall-post-time">{time}</span>
      </div>

      <div className="wall-post-content">{text}</div>

      <div className="wall-post-actions">
        <a href="#">Comment</a> · <a href="#">Like</a> · <a href="#">Share</a>
      </div>
    </div>
  );
}
