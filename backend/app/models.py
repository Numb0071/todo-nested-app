from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey('todos.id'), nullable=True)
    text = Column(String, nullable=False)
    assignee = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    is_done = Column(Boolean, default=False)

    children = relationship("Todo", backref='parent', remote_side=[id])
