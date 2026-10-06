"""The October 2 decision uses the original native presentation, not recreated slides."""
import re
import unittest
from pathlib import Path

SITE = Path(__file__).resolve().parents[2] / "dist"


class StoryOfDashboardTest(unittest.TestCase):
    def setUp(self):
        self.html = (SITE / "story-of-dashboard.html").read_text(encoding="utf-8")

    def test_actual_published_deck_is_primary_and_autoplays_once(self):
        self.assertRegex(self.html, r'<iframe[^>]+data-original-presentation[^>]+(?:data-defer-)?src="https://docs\.google\.com/presentation/d/e/[^"]+/embed\?start=true&amp;loop=false&amp;delayms=9000')
        self.assertEqual(self.html.count("data-original-presentation"), 1)
        self.assertNotIn("data-sb-go", self.html)
        self.assertNotIn("Open original slide", self.html)
        self.assertNotIn('id="slideshow"', self.html)

    def test_in_the_resources_menu_and_off_the_homepage(self):
        home = (SITE / "index.html").read_text(encoding="utf-8")
        menu = re.search(r'id="dd-res">(.*?)</div>', home, re.S).group(1)
        self.assertIn('href="story-of-dashboard.html"', menu)
        main = home.split('id="main"', 1)[1]
        self.assertNotIn("data-sb", main)
        self.assertNotIn("docs.google.com/presentation", main)


if __name__ == "__main__":
    unittest.main()
