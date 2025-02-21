'use client'

import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'

interface Submission {
  name: string
  email: string
  phone: string
  message: string
  timestamp: Date
}

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(
          collection(db, 'form-submissions'), 
          orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        })) as Submission[];
        
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (isLoading) {
    return <div className="p-8">Loading submissions...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Form Submissions</h1>
      <div className="space-y-6">
        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((sub, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <p className="text-lg"><strong>Name:</strong> {sub.name}</p>
              <p><strong>Email:</strong> {sub.email}</p>
              <p><strong>Phone:</strong> {sub.phone}</p>
              <p><strong>Message:</strong> {sub.message}</p>
              <p className="text-sm text-gray-500">
                <strong>Submitted:</strong> {sub.timestamp?.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 