export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600 text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-blue-600">LearnSkill Map</h2>
          <p className="mt-2">
            Revolutionizing professional learning through intelligent, personalized roadmaps and visual learning paths.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Platform</h3>
          <ul className="space-y-1">
            <li><a href="#">Browse Roadmaps</a></li>
            <li><a href="#">Create Custom Path</a></li>
            <li><a href="#">AI Recommendations</a></li>
            <li><a href="#">Progress Tracking</a></li>
            <li><a href="#">Achievements</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="#">Learning Guide</a></li>
            <li><a href="#">Community Forum</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">API Documentation</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Stay Updated</h3>
          <p className="mb-2">Get the latest learning resources and roadmap updates.</p>
          <div className="flex items-center gap-2">
  
          </div>
        </div>
      </div>

 
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © 2025 LearnSkill Map. All rights reserved.
      </div>
    </footer>
  );
}
