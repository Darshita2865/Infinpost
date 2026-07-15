import pandas as pd

# Sample Facebook posts about internships
facebook_data = [
    {
        'platform': 'facebook',
        'title': 'Google Internship 2026',
        'content': 'Google is hiring interns for 2026! Apply now for Software Engineering, Product Management, and Data Science roles.',
        'author': 'Google Careers',
        'likes': 456,
        'comments': 89,
        'created_at': '2026-07-10'
    },
    {
        'platform': 'facebook',
        'title': 'Microsoft Summer Internship',
        'content': 'Microsoft Summer Internship Program 2026 is now open. Apply for AI, Cloud, and Developer roles.',
        'author': 'Microsoft Jobs',
        'likes': 234,
        'comments': 45,
        'created_at': '2026-07-08'
    },
    {
        'platform': 'facebook',
        'title': 'Amazon AI Internship',
        'content': 'Amazon is hiring AI/ML interns. Work on cutting-edge projects with the Amazon AI team.',
        'author': 'Amazon Careers',
        'likes': 567,
        'comments': 78,
        'created_at': '2026-07-05'
    },
    {
        'platform': 'facebook',
        'title': 'Data Science Intern at Meta',
        'content': 'Meta is looking for Data Science interns. Join the team that builds the future of social media.',
        'author': 'Meta Careers',
        'likes': 345,
        'comments': 56,
        'created_at': '2026-07-01'
    },
    {
        'platform': 'facebook',
        'title': 'Software Engineering Intern',
        'content': 'Software Engineering Internship at top tech companies. Paid internships with great benefits.',
        'author': 'Tech Internships',
        'likes': 123,
        'comments': 34,
        'created_at': '2026-06-28'
    }
]

# Create DataFrame
df = pd.DataFrame(facebook_data)

# Save to datasets folder
output_path = r"C:\Users\Darshita\OneDrive\Desktop\infinpost\datasets\facebook_post.csv"
df.to_csv(output_path, index=False)

print(f"✅ Created {len(df)} Facebook posts")
print(f"📁 Saved to: {output_path}")