const VolunteerFormHeader = () => {
  return (
    <div className="form-item">
      <h1>CK Volunteer Intake Form</h1>
      <p>
        Thank you for your interest in volunteering with Community Kitchens!
        Volunteers like you make our work possible and help us build community
        and solidarity through food. To get started, please fill out the
        <strong> Volunteer Intake Form.</strong> Once submitted, you'll receive
        an email with log in credentials to the CK Volunteer Portal. Thank you
        for your commitment to providing meals with dignity and respect to all
        of our neighbors!
      </p>
      <br />
      <p>
        With Gratitude,
        <br />
        Mollye Chudacoff
        <br />
        Senior Meal and Volunteer Program Manager
        <br />
        Community Kitchens
        <br />
        Email:{" "}
        <a className="retro-link" href="mailto:mollye@ckoakland.org">
          mollye@ckoakland.org
        </a>
      </p>
      <br />
      <div className="form-volunteer-opportunities">
        Ongoing Volunteer Opportunities
      </div>
      <br />
      <p>
        🍲 <strong>CK Home Chef Program</strong>
        <br />
        Prepare nutritious, home-cooked meals from your own kitchen with friends
        or family to stock free Town Fridge pantries across Oakland. After a
        quick self-onboarding and obtaining your Food Handler's Certificate,
        you'll be ready to cook!
      </p>
      <br />
      <p>
        🚗 <strong>CK Driver Volunteers</strong>
        <br />
        Use your own vehicle to support food recovery and distribution efforts.
        Drivers help pick up food donations, deliver meals to Town Fridges or
        community partners.
      </p>
      <br />
      <p>
        👩‍🍳 <strong>Meal Prep at the CK Central Kitchen</strong>
        <br />
        Join our kitchen team to prepare and package meals for youth programs,
        encampments, and community events. It's a fun, collaborative environment
        with a big impact. The CK Kitchen welcomes volunteers ages 10 and up!
      </p>
      <br />
      <p>
        🥘 <strong>Doorfront Distribution at the CK Central Kitchen</strong>
        <br />
        Help serve freshly made CK meals directly to anyone who comes to our
        doors. This community-facing role is a simple but powerful way to
        connect with neighbors and ensure dignified access to food.
      </p>
      <br />
      <div>
        <strong>Questions?</strong>
        <ul>
          <li>
            <strong>For Driver, Meal Prep, or Doorfront Distribution</strong>{" "}
            programs, contact Kenai at{" "}
            <a className="retro-link" href="mailto:kenai@ckoakland.org">
              kenai@ckoakland.org
            </a>
          </li>
          <li>
            For the <strong>Home Chef Program</strong> or to{" "}
            <strong>organize a corporate or community volunteer event,</strong>{" "}
            contact Mollye at{" "}
            <a className="retro-link" href="mailto:mollye@ckoakland.org">
              mollye@ckoakland.org
            </a>
          </li>
          <li>
            Experiencing <strong>technical issues?</strong> Contact Andy at{" "}
            <a className="retro-link" href="mailto:andy@ckoakland.org">
              andy@ckoakland.org
            </a>
          </li>
        </ul>
      </div>

      <p className="required">* Indicates required question</p>
    </div>
  );
};

export default VolunteerFormHeader;
