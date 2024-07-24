import sys
from OnetWebService import OnetWebService
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})
 
# ----------------------------------------------------------------------
# not related to flask
# ----------------------------------------------------------------------


data = pd.read_csv('jobs.csv')
df = pd.read_csv('data.csv')

# def find_intersection(lists):
#     if not lists:
#         return []

#     intersection = set(lists[0])

#     for lst in lists[1:]:
#         intersection = intersection.intersection(lst)

#     return list(intersection)


# user_skill = list(map(str,input("Enter Your Skills : ").split()))

# super_list=[]

# for i in user_skill:
#     matching_job_titles = data[data['Key Skills'].str.contains(i, case=False, na=False)]['Job Title']
#     word_counts = Counter(list(matching_job_titles))
#     sorted_list = sorted(set(list(matching_job_titles)), key=lambda x: (-word_counts[x], x))
#     super_list.append(sorted_list)

# result_list= find_intersection(super_list)
# print(super_list)

# response_list=[]

# for i in range(len(user_skill)):
#     for j in range(min(5,len(super_list[i]))):
#         response_list.append(super_list[i][j])

def findJobs(user_skill):
    super_list = []
    response_list = []
    for i in user_skill:
        response_list.append([])
        matching_job_titles = data[data['Key Skills'].str.contains(
            i, case=False, na=False)]['Job Title']
        word_counts = Counter(list(matching_job_titles))
        sorted_list = sorted(set(list(matching_job_titles)),
                             key=lambda x: (-word_counts[x], x))
        super_list.append(sorted_list)

    for i in range(len(user_skill)):
        for j in range(min(5, len(super_list[i]))):
            response_list[i-1].append(super_list[i][j])
    return(response_list)


# ----------------------------------------------------------------------
# For getting the skills for specific jobs
# ----------------------------------------------------------------------

data = pd.read_csv('jobs.csv')


tfidf_vectorizer = TfidfVectorizer()
tfidf_job_titles = tfidf_vectorizer.fit_transform(
    data['Job Title'].values.astype('U'))

all_job_titles_tfidf = tfidf_vectorizer.transform(
    data['Job Title'].values.astype('U'))

similarities = cosine_similarity(all_job_titles_tfidf)


def getSkills(user_job_title):

    user_job_title_tfidf = tfidf_vectorizer.transform([user_job_title])

    user_similarities = cosine_similarity(
        user_job_title_tfidf, all_job_titles_tfidf)

    most_similar_index = user_similarities.argmax()

    corresponding_skill = data['Key Skills'][most_similar_index]

    if user_similarities[0][most_similar_index] > 0:
        print(f"The skill for '{user_job_title}' is '{corresponding_skill}'")
        return f'{corresponding_skill}'
    else:
        return ["Nothing Found"]

        # print(f"No matching skill found for '{user_job_title}'")
# getSkills(job_title)
# ----------------------------------------------------------------------
# ----------------------------------------------------------------------
# Onet Things


def get_user_input(prompt):
    result = ''
    while (len(result) == 0):
        result = input(prompt + ': ').strip()
    return result


def check_for_error(service_result):
    if 'error' in service_result:
        sys.exit(service_result['error'])


username = "career_counselling"
password = "5343uqw"
onet_ws = OnetWebService(username, password)

vinfo = onet_ws.call('about')
check_for_error(vinfo)


# ----------------------------------------------------------------------
# ----------------------------------------------------------------------


# ----------------------------------------------------------------------
# flask api things below
# ----------------------------------------------------------------------

# >>>>ML Routes<<<<

@app.route('/api/receive-array', methods=['PUT'])
def receive_array():
    received_array = request.get_json()
    jobs = findJobs(received_array)
    return jsonify(jobs)


@app.route('/api/getjobs', methods=['GET'])
def get_jobs():
    allJobs = list(df['Titles'])
    return jsonify(allJobs)


@app.route('/api/getskills', methods=['GET'])
def get_skills():
    input_string = request.args.get('queryString')
    skillsFound = list(getSkills(input_string).split("|"))
    print(skillsFound)
    return jsonify(skillsFound)

# >>>>Onet Routes<<<<

# ============================
# Bright Outlook
# ============================
@app.route('/api/browseoccupations/brightoutlook/<string:code>', methods=['GET'])
def get_Brightoutlook(code):
    kwresults = onet_ws.call(f'online/bright_outlook/{code}')
    check_for_error(kwresults)
    total = kwresults["total"]
    kwresults = onet_ws.call(f'online/bright_outlook/{code}?category_id=grow&sort=name&start=1&end={total}')
    return jsonify(kwresults["occupation"])
# -------------------------------------------
    
# ============================
# Career Cluster
# ============================
@app.route('/api/browseoccupations/careerclusters/<string:code>', methods=['GET'])
def get_Careercluster(code):
    kwresults= onet_ws.call(f"online/career_clusters/{code}")
    check_for_error(kwresults)
    total = kwresults["total"]
    kwresults= onet_ws.call(f"online/career_clusters/{code}?cluster={code}&sort=pathway&start=1&end={total}")
    return jsonify(kwresults["occupation"])
# -------------------------------------------
# ============================
# Industry
# ============================
@app.route('/api/browseoccupations/industry/<string:code>', methods=['GET'])
def get_Indusrty(code):
    kwresults= onet_ws.call(f"online/industries/{code}")
    check_for_error(kwresults)
    total = kwresults["total"]
    kwresults= onet_ws.call(f"online/industries/{code}?industry={code}&sort=name&start=1&end={total}")
    return jsonify(kwresults["occupation"])
# -------------------------------------------

@app.route('/api/viewjob/<string:code>', methods=['GET'])
def viewjob(code):
    kwresults= onet_ws.call(f"online/occupations/{code}/")
    check_for_error(kwresults)
    return jsonify(kwresults)
# -------------------------------------------
# -------------------------------------------
# Job Details
@app.route('/api/viewjobdetails/<string:code>', methods=['GET'])
def viewjobDetails(code):
    kwresults= onet_ws.call(f"online/occupations/{code}/details/",("display","long"))
    check_for_error(kwresults)
    return jsonify(kwresults)
# -------------------------------------------
# ============================
# Keyword Search
# ============================
@app.route('/api/keywordSearch')
def keyword_search():
    searchTerm = request.args.get('term', '').lower()
    result = onet_ws.call('online/search',
                         ('keyword', searchTerm),
                        )
    total =min( result["total"], 10)
    result = onet_ws.call('online/search',
                         ('keyword', searchTerm),
                         ('end', total))

    return jsonify(result["occupation"])
# -------------------------------------------
# ============================
# Intrest Profiler Questions
# ============================
@app.route('/api/interest/<string:answers>')
def getResult(answers):
    results = onet_ws.call(f'mnm/interestprofiler/results?answers={answers}')
    careers = onet_ws.call(f'mnm/interestprofiler/careers?answers={answers}')
    return jsonify({"result": results,"career" :careers})
# -------------------------------------------



if __name__ == '__main__':
    app.run()
