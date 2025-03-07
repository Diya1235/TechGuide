const topCollegesData = {
    "United States": {
      "New York": {
        "Computer Science": ["Columbia University", "New York University"],
        "Business": ["NYU Stern School of Business", "Columbia Business School"],
        "Engineering": ["Cornell Tech", "NYU Tandon School of Engineering"],
        "Medicine": ["Icahn School of Medicine", "Weill Cornell Medicine"],
        "Law": ["Columbia Law School", "NYU School of Law"]
      },
      "San Francisco": {
        "Computer Science": ["Stanford University", "UC Berkeley"],
        "Business": ["UC Berkeley Haas", "Stanford GSB"],
        "Engineering": ["UC Berkeley Engineering", "San Francisco State University"],
        "Medicine": ["UCSF School of Medicine"],
        "Law": ["UC Hastings College of the Law"]
      }
    },
    "United Kingdom": {
      "London": {
        "Computer Science": ["Imperial College London", "UCL"],
        "Business": ["London Business School", "King’s College London"],
        "Engineering": ["Imperial College Engineering", "Brunel University"],
        "Medicine": ["King’s College London School of Medicine"],
        "Law": ["London School of Economics (LSE) Law"]
      }
    },
    "India": {
      "Bangalore": {
        "Computer Science": ["IISc Bangalore", "IIIT Bangalore"],
        "Business": ["IIM Bangalore", "Christ University"],
        "Engineering": ["RV College of Engineering", "BMS College of Engineering"],
        "Medicine": ["St. John’s Medical College"],
        "Law": ["National Law School of India University (NLSIU)"]
      }
    }
  };
  
  /**
   * Function to fetch top colleges based on country, city, and course.
   */
  export const getTopColleges = (country, city, course) => {
    if (
      topCollegesData[country] &&
      topCollegesData[country][city] &&
      topCollegesData[country][city][course]
    ) {
      return topCollegesData[country][city][course];
    }
    return ["No data available for the selected location and course."];
  };
  